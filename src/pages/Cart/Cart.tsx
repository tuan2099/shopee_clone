import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchasesApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { PurchaseStatus } from 'src/constant/purchases'
import { Purchase } from 'src/type/purchase.type'
import { formartCurrency, generateNameId } from 'src/uitils/uitils'
import produce from 'immer'

interface ExtendedPurchases extends Purchase {
  disable: boolean
  checked: boolean
}

function Cart() {
  const [extendPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([]) // tạo state quản lý checked

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: PurchaseStatus.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: PurchaseStatus.inCart })
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = extendPurchases.every((purchase) => purchase.checked) // kiểm soát all check input check box

  useEffect(() => {
    setExtendedPurchases(
      purchasesInCart?.map((purchases) => ({
        ...purchases,
        disable: false,
        checked: false
      })) || []
    )
  }, [purchasesInCart])
  // sử dụng immer.js
  const handleChecke = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
        // khji click vào handle check all
        // mọi item => false
      }))
    )
  }
  return (
    <>
      <div className='bg-neutral-100 px-16'>
        <div className='container'>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='check-box'
                        className='h-5 w-5 accent-orange'
                        checked={isAllChecked}
                        onChange={handleCheckAll}
                      />
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
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {extendPurchases?.map((purchase, index) => (
                  <div
                    key={purchase._id}
                    className='grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-5 px-4 text-center text-sm text-gray-500'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex-shirk-0 flex items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            checked={purchase.checked}
                            onChange={handleChecke(index)}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              className='flex-shirk-0 h-20 w-20'
                              to={`/${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                            >
                              <img src={purchase.product.image} alt={purchase.product.name} />
                            </Link>
                            <div className='flexx-grow px-2 pt-1 pb-2'>
                              <Link
                                to={`/${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                                className='line-clamp-2'
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-grau-300 line-through'>
                              đ {formartCurrency(purchase.product.price_before_discount)}{' '}
                            </span>
                            <span className='ml-3'>đ {formartCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classnameWrapper='flex items-center'
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange'>
                            đ {formartCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
                <div className='flex items-center '>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                    Chọn tất cả ({extendPurchases.length})
                  </button>
                  <button className='mx-3 border-none bg-none'>Xóa</button>
                </div>

                <div className='ml-auto flex items-center'>
                  <div>
                    <div className='flex items-center sm:justify-end'>
                      <div>Tổng thanh toán (0 sản phẩm)</div>
                      <div className='ml-2 text-2xl text-orange'>1223453</div>
                    </div>
                    <div className='flex items-center text-sm sm:justify-end'>
                      <div className='text-gray-500'>Tiết kiệm</div>
                      <div className='ml-6 text-orange'>1232345</div>
                    </div>
                  </div>
                  <Button className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
                    Mua hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
