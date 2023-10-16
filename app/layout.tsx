import './globals.css';
import Navbar from '../app/components/Navbar';
import Footer from '../app/components/Footer';

export const metadata = {
  title: 'RAM BLOG',
  description: 'Discover remarkable posts from developers to developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
