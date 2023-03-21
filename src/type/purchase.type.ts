import { Product } from './product.type'
// mỗi Purchase có 1 status\

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5 // khi call api -> lấy ra sp trong giỏ nó sẽ dựa vào status (có trong doc API)
export type PurchaseListStatus = PurchaseStatus | 0 // mặc đinh lấy tất cả sản phẩm trong giỏ
export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
