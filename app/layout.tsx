import Navbar from '@/components/navigation/navbar';
import './globals.css'
import Footer from '@/components/footer';
import { Metadata } from 'next';


export const metadata:Metadata = {
  title: 'Prime Solar',
  description: "Get some information about your home's solar potential",
  keywords: "Solar Installations, Solar, Solar Power",
  robots: "index, follow",
  openGraph: {
    images: "images/home.png",
    type: 'website',
    locale: 'en_ZA',
    title: 'Prime Solar',
    description: "Get some information about your home's solar potential",
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-foreground min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
