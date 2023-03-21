// khai báo status purchases
export const PurchaseStatus = {
  inCart: -1, // spn trong giỏ
  all: 0, // tất cả sản phẩm
  waitForConfirmation: 1, // đang chừo xử lý
  waitForGetting: 2, // đang lấy
  inProgress: 3, // đang vận chuyển
  delivered: 4, //đã đc giao
  cancelled: 5 // bị hủy
} as const
