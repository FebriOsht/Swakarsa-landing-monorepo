import { getAvailableHeroes } from "@/app/lib/actions";
import DraftingBoard from "@/app/components/lab/DraftingBoard";
import { Metadata } from "next";
import { auth } from "@/auth"; 
import { redirect } from "next/navigation"; 

export const metadata: Metadata = {
  title: "The Lab - Team Builder | Swakarsa Platform",
  description: "Draft your dream team and estimate project burn rate.",
};

export default async function DraftingPage() {
  // 1. SECURITY GUARD (Role Check)
  const session = await auth();
  
  // PERBAIKAN: Gunakan (session?.user as any).role agar TypeScript tidak error
  const userRole = (session?.user as any)?.role;

  // Jika user adalah KONSULTAN, dilarang masuk sini!
  if (userRole === 'CONSULTANT') {
    redirect('/guild'); 
  }

  // 2. Fetch data Konsultan (Heroes) langsung di Server
  const heroes = await getAvailableHeroes();

  // 3. Render Client Component dengan data awal
  return <DraftingBoard initialHeroes={heroes} />;
}