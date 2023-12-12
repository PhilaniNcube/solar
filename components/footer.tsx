import { Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-800 text-center text-white flex items-center justify-center">
      <Link href="mailto:ncbphi001@gmail.com" className="text-sm flex items-center justify-center space-x-3"><Mail /> Philani Ncube</Link>
    </footer>
  );
}
