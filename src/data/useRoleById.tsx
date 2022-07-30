import { BASE_API_URL } from '@nexys/constants/ConstBaseURL'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import { RoleEntity } from './useRole'

type UseRoleResult = RoleEntity

type TQueryFnData = UseRoleResult
type TError = AxiosError

// endpoint API
const endpointURL = `${BASE_API_URL}/role`

function useRoleById(
  id: any,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey(['/role-by-id', id]),
    () => ApiCall.api.get(urlQuery.transformUrl(`${endpointURL}/${id}`)),
    {
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      select: (res: any) => res?.data?.data,
      enabled: Boolean(id),
      ...options,
    },
  )

  return {
    ...query,
    helper: urlQuery,
  }
}

export default useRoleById
