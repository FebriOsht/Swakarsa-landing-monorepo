import React from "react";

// Layout ini membungkus halaman di dalam folder (agency)
export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="agency-wrapper">
      {/* Navbar dan Footer nanti akan dipasang di sini */}
      {children}
    </div>
  );
}