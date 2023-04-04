import React from 'react'
import CardHeader from 'src/components/CardHeader'
import Footer from 'src/components/footer'

interface Props {
  children?: React.ReactNode // khai báo props children layout
}

function CartLayout({ children }: Props) {
  return (
    <>
      <CardHeader />
      {children}
      <Footer />
    </>
  )
}

export default CartLayout
