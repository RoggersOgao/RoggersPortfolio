import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
export const metadata = {
  title: 'Roggers Portfolio',
  description: 'Coded by Roggers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
