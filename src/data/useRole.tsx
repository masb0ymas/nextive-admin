import { BASE_API_URL } from '@nexys/constants/ConstBaseURL'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'

export const defaultRoleData = {
  id: null,
  name: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
}

export interface RoleEntity {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type RoleAttributes = Omit<
  RoleEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

type UseRoleResult = {
  data: RoleEntity[]
  total: number
}

type TQueryFnData = UseRoleResult
type TError = AxiosError

// endpoint API
const endpointURL = `${BASE_API_URL}/role?`

function useRole(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/role'),
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

export default useRole
