import { SuccessResponse } from './../type/utils.type'
import http from 'src/uitils/http'
import { Purchase, PurchaseListStatus } from 'src/type/purchase.type'

const URL = 'purchases' // đường dẫn url

const purchasesApi = {
  // add to card có method post -> gửi lên 1 body
  // buy_count : số lượng mua
  addToCard(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body) // quy đinh kiểu trả về từ phía API
  },
  // sẽ gửi lên 1 query param status
  getPurchases(params: { status: PurchaseListStatus }) {
    // status truyền vào mô tả trong phần type
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, { params })
  },
  // là 1 mảng các obj
  buyProduct(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy_products`, body)
  },
  updatePurchases(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchases`, body)
  },
  deletePurchases(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchasesApi
