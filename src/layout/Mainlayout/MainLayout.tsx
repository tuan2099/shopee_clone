import React from 'react'
import Footer from 'src/components/footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode // khai báo props children layout
}

function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
