import React from 'react';
import Image from 'next/image';

// Interface sesuai Prisma Model
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

export default function TeamSection({ team }: { team: TeamMember[] }) {
  // Fallback jika data kosong
  const displayTeam = team && team.length > 0 ? team : [
    { id: '1', name: 'Ahmad', role: 'Lead Developer', image: '/images/jonathan.jpeg', description: 'Fullstack Expert' },
    { id: '2', name: 'Reynardi', role: 'UI/UX Designer', image: '/images/jethro.jpeg', description: 'Creative Mind' },
    { id: '3', name: 'Taufiq', role: 'Project Manager', image: '/images/logo.jpeg', description: 'Scrum Master' },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet The Squad</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Orang-orang dibalik layar yang siap merealisasikan ide gila Anda menjadi produk digital berkualitas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTeam.map((member) => (
            <div key={member.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="relative h-80 w-full overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-sm">{member.description}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-indigo-600 font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}