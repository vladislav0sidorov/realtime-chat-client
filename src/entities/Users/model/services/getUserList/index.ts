import { rtkApi } from '@/shared/api/rtkApi'
import { usersActions } from '../../slice/usersSlice'

const getUserList = rtkApi.injectEndpoints({
  endpoints: build => ({
    getUserList: build.mutation({
      query: () => ({
        url: '/users',
        method: 'GET'
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(usersActions.setUsersData(data))
        } catch (error) {
          console.error('get users error:', error)
        }
      }
    })
  })
})

export const useGetUsersList = getUserList.useGetUserListMutation
