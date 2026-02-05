import { getBlogPostById, updateBlogPost, BlogState } from "@/app/lib/blog-actions";
import { notFound } from "next/navigation";
import EditBlogForm from "./edit-form"; // Kita pisahkan form ke komponen client agar lebih rapi

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-slate-50">
       <EditBlogForm post={post} />
    </div>
  );
}