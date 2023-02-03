import React from 'react'
import { Link } from 'react-router-dom'

function ProductList() {
  return (
    <div>
      <Link to='/login'> come to login page </Link>
      <Link to='/register'> come to register page </Link>
    </div>
  )
}

export default ProductList
