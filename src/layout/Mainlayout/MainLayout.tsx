import React from 'react'
import Header from 'src/components/Header'
import Footer from 'src/components/footer'

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
