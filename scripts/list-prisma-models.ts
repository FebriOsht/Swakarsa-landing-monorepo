import { prisma } from "@/app/lib/prisma"; // sesuaikan path jika perlu

console.log(Object.keys(prisma).filter(k => typeof (prisma as any)[k] === "object"));
process.exit(0);