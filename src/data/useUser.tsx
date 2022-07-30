import { BASE_API_URL } from '@nexys/constants/ConstBaseURL'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { RoleEntity } from 'data/useRole'
import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'

export const defaultUserData = {
  id: null,
  fullName: null,
  email: null,
  phone: null,
  picturePath: null,
  isActive: null,
  RoleId: null,
  Role: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
}

export interface UserEntity {
  id: string
  fullName: string
  email?: string | null
  phone: string
  picturePath: string
  isActive?: boolean | null
  RoleId: string
  Role: RoleEntity
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type UserAttributes = Omit<
  UserEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

type UseUserResult = {
  data: UserEntity[]
  total: number
}

type TQueryFnData = UseUserResult
type TError = AxiosError

// endpoint API
const endpointURL = `${BASE_API_URL}/user?`

function useUser(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/user'),
    () =>
      ApiCall.api.get(urlQuery.transformUrl(endpointURL)).then((res) => {
        return res.data
      }),
    {
      ...options,
    },
  )

  return {
    ...query,
    data: query.data?.data,
    total: query.data?.total,
    helpers: urlQuery,
  }
}

export default useUser
