import React from 'react'
import Footer from 'src/components/footer'
import RegisterHeader from 'src/components/registerHeader/RegisterHeader'

interface Props {
  children?: React.ReactNode // khai báo props children layout
}

function RegisterLayout({ children }: Props) {
  return (
    <>
      <RegisterHeader />
      {children}
      <Footer />
    </>
  )
}

export default RegisterLayout
