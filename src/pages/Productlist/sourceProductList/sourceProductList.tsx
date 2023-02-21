import React from 'react'
import Button from 'src/components/Button'
function SourceProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3 '>
      <div className='item-center flex flex-wrap justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button className='h-8 bg-orange  px-4 text-sm capitalize text-white hover:bg-orange/80 '></button>
        </div>
      </div>
    </div>
  )
}

export default SourceProductList
