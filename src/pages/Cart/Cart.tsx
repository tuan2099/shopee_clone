import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import purchasesApi from 'src/apis/purchase.api'
import { PurchaseStatus } from 'src/constant/purchases'

function Cart() {
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: PurchaseStatus.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: PurchaseStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  return (
    <>
      <div className='bg-neutral-100 px-16'>
        <div className='container'>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid-col-12 grid rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6 bg-white'>
                  <div className='flex items-center'>
                    <div className='flex-shirk-0 prr-3 flex items-center justify-center'>
                      <input type='check-box' className='h-5 w-5 accent-orange' />
                    </div>
                    <div className='flex-grow text-black'>Sản phẩm</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2'>Đơn giá</div>
                    <div className='col-span-1'>Số lượng</div>
                    <div className='col-span-1'>Số tiền</div>
                    <div className='col-span-1'>Thao tác</div>
                  </div>
                </div>
              </div>
              {}
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {purchasesInCart?.map((purchase, index) => (
                  <div
                    key={purchase._id}
                    className='grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-5 px-4 text-center text-sm text-gray-500'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex-shirk-0 flex items-center justify-center pr-3'>
                          <input type='checkbox' className='h-5 w-5 accent-orange' />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            {/* <Link className='h-20 w-20 flex-shirk-0' to={`/${}`}></Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
