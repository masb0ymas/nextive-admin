import { BASE_API_URL } from '@nexys/constants/ConstBaseURL'
import { AxiosInstance } from 'axios'
import Fetcher from 'services/Fetcher'
import { LoginEntity } from 'views/Auth/Login'

interface MultipleIdsEntity {
  ids: string | string[]
}

const LOCAL_STORAGE_SESSION =
  process.env.LOCAL_STORAGE_SESSION ?? 'your_access_token'

// const timeout = 5 * 60 * 1000 // 5 minutes timeout

class BaseApiCall {
  public api: AxiosInstance

  constructor() {
    this.api = Fetcher.createAuthAxios(BASE_API_URL, LOCAL_STORAGE_SESSION)
  }

  async login(data: LoginEntity) {
    const response = await this.api.post(`/auth/sign-in`, data)
    return response
  }

  async logout(data: any) {
    const response = await this.api.post(`/logout`, data)
    return response
  }

  User = {
    create: async (data: any) => {
      const response = await this.api.post(`/user`, data)
      return response
    },
    update: async (id: string, data: any) => {
      const response = await this.api.put(`/user/${id}`, data)
      return response
    },
    softDelete: async (id: string) => {
      const response = await this.api.delete(`/user/soft-delete/${id}`)
      return response
    },
    forceDelete: async (id: string) => {
      const response = await this.api.delete(`/user/force-delete/${id}`)
      return response
    },
    restore: async (id: string) => {
      const response = await this.api.put(`/user/restore/${id}`)
      return response
    },
    multipleSoftDelete: async (data: MultipleIdsEntity) => {
      const response = await this.api.post(`/user/multiple/soft-delete`, data)
      return response
    },
    multipleForceDelete: async (data: MultipleIdsEntity) => {
      const response = await this.api.post(`/user/multiple/force-delete`, data)
      return response
    },
    multipleRestore: async (data: MultipleIdsEntity) => {
      const response = await this.api.post(`/user/multiple/restore`, data)
      return response
    },
  }

  Role = {
    create: async (data: any) => {
      const response = await this.api.post(`/role`, data)
      return response
    },
    update: async (id: string, data: any) => {
      const response = await this.api.put(`/role/${id}`, data)
      return response
    },
    softDelete: async (id: string) => {
      const response = await this.api.delete(`/role/soft-delete/${id}`)
      return response
    },
    forceDelete: async (id: string) => {
      const response = await this.api.delete(`/role/force-delete/${id}`)
      return response
    },
    restore: async (id: string) => {
      const response = await this.api.put(`/role/restore/${id}`)
      return response
    },
    multipleSoftDelete: async (data: MultipleIdsEntity) => {
      const response = await this.api.post(`/role/multiple/soft-delete`, data)
      return response
    },
    multipleForceDelete: async (data: MultipleIdsEntity) => {
      const response = await this.api.post(`/role/multiple/force-delete`, data)
      return response
    },
    multipleRestore: async (data: MultipleIdsEntity) => {
      const response = await this.api.post(`/role/multiple/restore`, data)
      return response
    },
  }
}

const ApiCall = new BaseApiCall()

export default ApiCall
