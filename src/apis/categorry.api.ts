import { SuccessResponse } from './../type/utils.type'
import http from 'src/uitils/http'
import { Categorry } from 'src/type/categorry.type'

const URL = 'categories'
const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Categorry[]>>(URL)
  }
}

export default categoryApi
