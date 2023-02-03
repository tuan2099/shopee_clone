import React from 'react'

interface Props {
  children?: React.ReactNode // khai báo props children layout
}

function RegisterLayout({ children }: Props) {
  return <div>RegisterLayout{children}</div>
}

export default RegisterLayout
