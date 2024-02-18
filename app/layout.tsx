import Navbar from '@/components/navigation/navbar';
import './globals.css'
import Footer from '@/components/footer';
import { Metadata } from 'next';
import { GoogleTagManager } from "@next/third-parties/google";


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
				<body className="flex flex-col min-h-screen text-foreground">
					<Navbar />
					<div className="flex-1">{children}</div>
					<Footer />
				</body>
				<GoogleTagManager gtmId="GTM-PD22QM48" />
			</html>
		);
}
