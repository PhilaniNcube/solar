import Navbar from '@/components/navigation/navbar';
import './globals.css'
import Footer from '@/components/footer';


export const metadata = {
  title: 'Radiant Potential',
  description: "Get some information about your home's solar potential",
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
