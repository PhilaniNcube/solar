import './globals.css'


export const metadata = {
  title: 'Solar Potential',
  description: 'Get some information about your home&apos;s solar potential',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
