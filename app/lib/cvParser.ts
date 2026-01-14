// CV Parser Utility
export interface ParsedCV {
  name: string;
  title: string;
  email: string;
  location: string;
  linkedin?: string;
  github?: string;
  summary: string;
  skills: string[];
  experience: Array<{
    position: string;
    company: string;
    period: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    gpa?: string;
  }>;
  certifications?: string[];
}

export async function parseCV(cvPath: string): Promise<ParsedCV> {
  try {
    const response = await fetch(cvPath);
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    const cv: Partial<ParsedCV> = {
      name: '',
      title: '',
      email: '',
      location: '',
      summary: '',
      skills: [],
      experience: [],
      education: [],
    };

    let currentSection = '';
    let currentExperience: any = null;
    let currentEducation: any = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Name and Title (first 2 lines)
      if (i === 0) {
        cv.name = line;
      } else if (i === 1) {
        cv.title = line;
      }
      // Professional Contact
      else if (line.includes('PROFESSIONAL CONTACT')) {
        currentSection = 'contact';
      }
      else if (currentSection === 'contact') {
        if (line.startsWith('Email:')) {
          cv.email = line.replace('Email:', '').trim();
        } else if (line.startsWith('Location:')) {
          cv.location = line.replace('Location:', '').trim();
        } else if (line.startsWith('LinkedIn:')) {
          cv.linkedin = line.replace('LinkedIn:', '').trim();
        } else if (line.startsWith('GitHub:')) {
          cv.github = line.replace('GitHub:', '').trim();
        } else if (line.includes('PROFESSIONAL SUMMARY') || line.includes('TECHNICAL SKILLS')) {
          currentSection = '';
        }
      }
      // Professional Summary
      else if (line.includes('PROFESSIONAL SUMMARY')) {
        currentSection = 'summary';
      }
      else if (currentSection === 'summary') {
        if (line.includes('TECHNICAL SKILLS') || line.includes('CORE COMPETENCIES')) {
          currentSection = '';
        } else if (line && !line.includes('PROFESSIONAL SUMMARY')) {
          cv.summary = (cv.summary || '') + ' ' + line;
        }
      }
      // Technical Skills
      else if (line.includes('TECHNICAL SKILLS') || line.includes('CORE COMPETENCIES')) {
        currentSection = 'skills';
      }
      else if (currentSection === 'skills') {
        if (line.includes('PROFESSIONAL EXPERIENCE') || line.includes('EDUCATION')) {
          currentSection = '';
        } else if (line && !line.includes('TECHNICAL SKILLS') && !line.includes('CORE COMPETENCIES')) {
          // Parse skills (can be comma-separated or colon-separated)
          const skillLine = line.includes(':') ? line.split(':')[1] : line;
          const skills = skillLine.split(',').map(s => s.trim()).filter(s => s);
          cv.skills = [...(cv.skills || []), ...skills];
        }
      }
      // Professional Experience
      else if (line.includes('PROFESSIONAL EXPERIENCE') || line.includes('LEADERSHIP EXPERIENCE')) {
        currentSection = 'experience';
      }
      else if (currentSection === 'experience') {
        if (line.includes('EDUCATION') || line.includes('KEY PROJECTS') || line.includes('CERTIFICATIONS')) {
          if (currentExperience) {
            cv.experience = [...(cv.experience || []), currentExperience];
            currentExperience = null;
          }
          currentSection = '';
        } else if (line.match(/^\d{4}/) || line.includes('Present') || line.includes('-')) {
          // This might be a period line
          if (currentExperience && line.match(/^\d{4}/)) {
            currentExperience.period = line;
          }
        } else if (line && line.length > 10 && !line.startsWith('-')) {
          // Likely a position/company line
          if (currentExperience) {
            cv.experience = [...(cv.experience || []), currentExperience];
          }
          const parts = line.split('|');
          currentExperience = {
            position: parts[0]?.trim() || line,
            company: parts[1]?.trim() || '',
            period: '',
            description: []
          };
        } else if (line.startsWith('-') && currentExperience) {
          currentExperience.description.push(line.replace('-', '').trim());
        }
      }
      // Education
      else if (line.includes('EDUCATION')) {
        if (currentExperience) {
          cv.experience = [...(cv.experience || []), currentExperience];
          currentExperience = null;
        }
        currentSection = 'education';
      }
      else if (currentSection === 'education') {
        if (line.includes('CERTIFICATIONS') || line.includes('HONORS') || line.includes('AWARDS')) {
          if (currentEducation) {
            cv.education = [...(cv.education || []), currentEducation];
            currentEducation = null;
          }
          currentSection = '';
        } else if (line && line.length > 5 && !line.includes('EDUCATION')) {
          if (currentEducation) {
            cv.education = [...(cv.education || []), currentEducation];
          }
          // Try to parse education line
          const parts = line.split('|');
          const gpaMatch = line.match(/GPA[:\s]+([\d.]+)/i);
          currentEducation = {
            degree: parts[0]?.trim() || line,
            institution: parts[1]?.trim() || '',
            period: '',
            gpa: gpaMatch ? gpaMatch[1] : undefined
          };
        } else if (line.match(/\d{4}/) && currentEducation) {
          currentEducation.period = line;
        }
      }
      // Certifications
      else if (line.includes('CERTIFICATIONS')) {
        if (currentEducation) {
          cv.education = [...(cv.education || []), currentEducation];
          currentEducation = null;
        }
        currentSection = 'certifications';
        cv.certifications = [];
      }
      else if (currentSection === 'certifications') {
        if (line && line.startsWith('-')) {
          cv.certifications = [...(cv.certifications || []), line.replace('-', '').trim()];
        }
      }
    }

    // Clean up
    if (currentExperience) {
      cv.experience = [...(cv.experience || []), currentExperience];
    }
    if (currentEducation) {
      cv.education = [...(cv.education || []), currentEducation];
    }

    return cv as ParsedCV;
  } catch (error) {
    console.error('Error parsing CV:', error);
    throw error;
  }
}

