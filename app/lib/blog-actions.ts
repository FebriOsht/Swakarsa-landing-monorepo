'use server'

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { BlogPost } from "@prisma/client"; // Import tipe data resmi

// Tipe data untuk State Form
export type BlogState = {
  message?: string | null;
  errors?: {
    title?: string[];
    content?: string[];
    slug?: string[];
  };
};

// Create Post Action
export async function createBlogPost(prevState: BlogState, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const excerpt = formData.get("excerpt") as string;
  const author = formData.get("author") as string;
  const category = formData.get("category") as string;
  const ctaText = formData.get("ctaText") as string;
  const ctaLink = formData.get("ctaLink") as string;

  if (!title || title.length < 3) {
    return {
      errors: { title: ["Judul minimal 3 karakter"] },
      message: "Gagal membuat postingan.",
    };
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        imageUrl,
        author,
        category,
        ctaText,
        ctaLink,
        published: true,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Gagal menyimpan. Judul mungkin sudah ada (slug duplikat).",
    };
  }

  revalidatePath("/blog");
  revalidatePath("/(platform)/admin/blog");
  redirect("/blog");
}

// Update Post Action
export async function updateBlogPost(id: string, prevState: BlogState, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const excerpt = formData.get("excerpt") as string;
  const author = formData.get("author") as string;
  const category = formData.get("category") as string;
  const ctaText = formData.get("ctaText") as string;
  const ctaLink = formData.get("ctaLink") as string;

  if (!title || title.length < 3) {
    return {
      errors: { title: ["Judul minimal 3 karakter"] },
      message: "Gagal memperbarui postingan.",
    };
  }

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        content,
        excerpt,
        imageUrl,
        author,
        category,
        ctaText,
        ctaLink,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Gagal memperbarui database.",
    };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`); // Revalidate detail page if using ID, or handle slug changes if needed
  revalidatePath("/(platform)/admin/blog");
  redirect("/admin"); // Redirect back to admin dashboard
}

// Delete Post Action
export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    revalidatePath("/blog");
    revalidatePath("/(platform)/admin/blog");
    revalidatePath("/admin");
    return { message: "Berhasil dihapus" };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { message: "Gagal menghapus postingan" };
  }
}

// Get All Posts dengan Return Type Eksplisit
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      // where: { published: true }, // Commented out to show all in admin
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

// Get Single Post by Slug dengan Return Type Eksplisit
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    return post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

// Get Single Post by ID (for Edit page)
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });
    return post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}