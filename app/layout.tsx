import Navbar from '@/components/navigation/navbar';
import './globals.css'
import Footer from '@/components/footer';
import { Metadata } from 'next';


export const metadata:Metadata = {
  title: 'Radiant Potential',
  description: "Get some information about your home's solar potential",
  keywords: "Solar Installations, Solar, Solar Power",
  robots: "index, follow",
  openGraph: {
    images: "images/home.png",
    type: 'website',
    locale: 'en_ZA',
    title: 'Radiant Potential',
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
      <body className="bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
