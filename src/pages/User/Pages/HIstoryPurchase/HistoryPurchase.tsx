import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import purchasesApi from 'src/apis/purchase.api'
import { PurchaseStatus } from 'src/constant/purchases'
import useQueryParams from 'src/hooks/useQueryParam'
import { PurchaseListStatus } from 'src/type/purchase.type'
import { formartCurrency, generateNameId } from 'src/uitils/uitils'

const purchaseTabs = [
  { status: PurchaseStatus.all, name: 'Tất cả' },
  { status: PurchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: PurchaseStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: PurchaseStatus.inProgress, name: 'Đang giao' },
  { status: PurchaseStatus.delivered, name: 'Đã giao' },
  { status: PurchaseStatus.cancelled, name: 'Đã hủy' }
]
// renderTab ui
function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  // ép kiểu sang number
  const status: number = Number(queryParams.status) || PurchaseStatus.all

  // call api get all product incart
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchasesApi.getPurchases({ status: status as PurchaseListStatus })
  })
  // xử lý data gọi về
  const purchasesInCart = purchasesInCartData?.data.data

  // ren der tab link
  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      to={{
        pathname: '/user/purchase',
        search: createSearchParams({ status: String(tab.status) }).toString()
      }}
      key={tab.status}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))
  return (
    <>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      đ{formartCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>đ{formartCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      đ{formartCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryPurchase
