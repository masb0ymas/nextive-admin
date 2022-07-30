import { BASE_API_URL } from '@nexys/constants/ConstBaseURL'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'

export interface UseProfileData {
  id: string
  fullName: string
  email?: string | null
  phone: string
  address?: string | null
  picturePath?: string | null
  isActive?: boolean | null
  RoleId: string
}

type UseProfileResult = UseProfileData

type TQueryFnData = UseProfileResult
type TError = AxiosError

// endpoint API
const endpointURL = `${BASE_API_URL}/auth/verify-session`

function useProfile(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/verify-session'),
    () =>
      ApiCall.api.get(urlQuery.transformUrl(endpointURL), {
        isShowNotificationError: false,
      }),
    {
      refetchInterval: 1000 * 30 * 1, // 1 second
      select: (res: any) => res?.data?.data,
      retry: (failureCount, error: AxiosError) => {
        if (error?.response?.status === 401) {
          return false
        }
        return failureCount <= 3
      },
      ...options,
    },
  )
  return {
    ...query,
    helper: urlQuery,
  }
}

export default useProfile
