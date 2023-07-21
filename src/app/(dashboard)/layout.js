import Nav from "@/dashboardComponents/nav/Nav";
export const metadata = {
  title: 'Roggers Portfolio Dashboard',
  description: 'Coded by Roggers',
}

export default function RootLayout({
    children,session
  }) {
    return (
      <section>
      <Nav />
        {children}
      </section>
    )
  }