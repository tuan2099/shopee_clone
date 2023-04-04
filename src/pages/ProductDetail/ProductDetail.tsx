import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/productRating'
import { formartCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/uitils/uitils'
import DOMPurify from 'dompurify'
import { Product as ProductType, ProductListConfig } from 'src/type/product.type'
import Product from '../Productlist/components/Product'
import QuantityController from 'src/components/QuantityController'
import purchasesApi from 'src/apis/purchase.api'
import { queryClient } from 'src/main'
import { PurchaseStatus } from 'src/constant/purchases'
import { toast } from 'react-toastify'

function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [hoverActiveImage, setHoverAcctiveImage] = useState('')
  const iamgeRef = useRef<HTMLImageElement>(null) // hover zoom
  const navigate = useNavigate()

  // call api product detail
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  const curentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    [product, currentIndexImage]
  ) // slide product
  const queryConfig = { limit: '20', page: '1', category: product?.category._id }

  const { data: ProductData } = useQuery({
    // đổi tên thành productdataa
    queryKey: ['products', queryConfig], // truyền query param để link động trên url khi thay đổi data
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig) // ép kiểu
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000 // lấy data cũ để ko phải gọi lại nữa
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      // có data và ko underfile
      setHoverAcctiveImage(product.images[0])
    }
  }, [product])

  const chosseActive = (img: string) => {
    // hover
    setHoverAcctiveImage(img)
  }
  const buttonNextSlider = () => {
    if (currentIndexImage[1] < (product as ProductType).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const buttonPrevSlider = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  // api addtocard
  const addToCartMutation = useMutation(purchasesApi.addToCard)

  // const handleZoom = (event: any) => {
  //  const image =  iamgeRef.current as HTMLImageElement
  //  image.style.width =
  // }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const addToCart = () => {
    // truyền vào do thằng id có thể underfine nên phải ép sang string
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        // add xong cập nhật
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 2000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: PurchaseStatus.inCart }] })
        }
      }
    )
  }
  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
    const purchase = res.data.data
    // chuyển state từ trangg này qua trang khác để trang kia nhận state (dữ liệu sản phẩm mua ngay)
    navigate('/cart', {
      state: {
        purchaseId: purchase._id
      }
    })
  }
  if (!product) return null

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  src={hoverActiveImage}
                  alt={product.name}
                  className='absolute top-0 left-0 h-full bg-white object-cover'
                  ref={iamgeRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={buttonPrevSlider}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {curentImages.map((img, index) => {
                  const isActive = img === hoverActiveImage
                  return (
                    <div key={img} className='relative w-full pt-[100%]' onMouseEnter={() => chosseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange '></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={buttonNextSlider}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='item-center flex'>
                  <span className='text-orrange mr-1 border-b border-b-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname={'fill-orange text-orange h-4 w-4'}
                    noneActiveClassName={'fill-gay-300 text-gray-300 h-4 w-4'}
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{formartCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>{formartCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onDecrese={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                  // onForcusOut={(value) =>
                  //   handleQuantity(
                  //     index,
                  //     value,
                  //     value >= 1 && value <= (purchasesInCart as Purchase[])[index].buy_count
                  //   )
                  // }
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='hover:bg-orange-5 flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h5 mr-[10px] w-5 fill-current stroke-orange text-orange'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className=' bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              />
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='container'>
            {ProductData && (
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {ProductData.data.data.products.map((product) => {
                  return (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
