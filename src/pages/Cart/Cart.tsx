import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchasesApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { PurchaseStatus } from 'src/constant/purchases'
import { Purchase } from 'src/type/purchase.type'
import { formartCurrency, generateNameId } from 'src/uitils/uitils'
import produce from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
import noproduct from 'src/assets/images/no-product.png'
import { AppContext } from 'src/contexts/app.context'

function Cart() {
  const { extendPurchases, setExtendedPurchases } = useContext(AppContext)
  const location = useLocation() // lấy state đưuọc truyền qua
  const chosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId //

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: PurchaseStatus.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: PurchaseStatus.inCart })
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = useMemo(() => extendPurchases.every((purchase) => purchase.checked), [extendPurchases]) // kiểm soát all check input check box
  const checkedPurchases = useMemo(() => extendPurchases.filter((purchase) => purchase.checked), [extendPurchases])
  const checkedPurchasesCount = checkedPurchases.length
  // tổng giá san phẩm trong giỏ
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  // tiết kiệm được
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const updatepurchaseMutation = useMutation({
    mutationFn: purchasesApi.updatePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchasesApi.deletePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchasesApi.buyProduct,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObj = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchases) => {
          const isChosePurchaseFromLocation = chosenPurchaseIdFromLocation === purchases._id
          return {
            ...purchases,
            disable: false,
            checked: isChosePurchaseFromLocation || Boolean(extendedPurchasesObj[purchases._id]?.checked) // kiểm tra khi vừa update số lượng xong thì ko bị mất checked tại sản phẩm đó (lodash)
          }
        }) || []
      )
    })
  }, [purchasesInCart, chosenPurchaseIdFromLocation])
  // xóa state in cart
  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])
  // sử dụng immer.js
  const handleChecke = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
        // khi click vào handle check all
        // mọi item => false
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  // tăng giảm => up date số lượng
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disable = true // khi up date thì cần disable ko cho ng dùng tăng hoặc giảm nữa
        })
      )
      updatepurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }
  const handleDeletemanyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }
  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }

  return (
    <>
      <div className='bg-neutral-100 px-16'>
        <div className='container'>
          {extendPurchases.length > 0 ? (
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
                      className='grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500'
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
                              onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                              onDecrese={(value) => handleQuantity(index, value, value >= 1)}
                              disabled={purchase.disable}
                              onType={handleTypeQuantity(index)}
                              onForcusOut={(value) =>
                                handleQuantity(
                                  index,
                                  value,
                                  value >= 1 && value <= (purchasesInCart as Purchase[])[index].buy_count
                                )
                              }
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-orange'>
                              đ {formartCurrency(purchase.product.price * purchase.buy_count)}
                            </span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              className='bg-none text-black transition-colors hover:text-orange'
                              onClick={handleDelete(index)}
                            >
                              Xóa
                            </button>
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
                    <button className='mx-3 border-none bg-none' onClick={handleDeletemanyPurchases}>
                      Xóa
                    </button>
                  </div>

                  <div className='ml-auto flex items-center'>
                    <div>
                      <div className='flex items-center sm:justify-end'>
                        <div>Tổng thanh toán ({checkedPurchasesCount} sản phẩm)</div>
                        <div className='ml-2 text-2xl text-orange'>{formartCurrency(totalCheckedPurchasePrice)}</div>
                      </div>
                      <div className='flex items-center text-sm sm:justify-end'>
                        <div className='text-gray-500'>Tiết kiệm</div>
                        <div className='ml-6 text-orange'>{formartCurrency(totalCheckedPurchaseSavingPrice)}</div>
                      </div>
                    </div>
                    <Button
                      onClick={handleBuyPurchases}
                      disabled={buyProductsMutation.isLoading}
                      className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                    >
                      Mua hàng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center'>
              <img src={noproduct} alt='no purchase' className='mx-auto h-24 w-24' />
              <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
              <div className='mt-5 text-center'>
                <Link
                  to='/'
                  className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
