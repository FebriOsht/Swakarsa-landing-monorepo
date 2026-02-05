import { User } from "next-auth"; // atau impor tipe User yang sesuai

interface SidebarProps {
  user?: User | null;
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <aside>
      {/* gunakan user di sini, contoh: */}
      <div>{user?.name ?? "Guest"}</div>
      {/* ...existing code... */}
    </aside>
  );
}