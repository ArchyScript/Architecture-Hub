import { HandleTokenResponse } from '@/controller/utilities/axios_return_response'
import store from '@/store'

export const tokenVerification = async (token: any) => {
  const auth_user_id = await HandleTokenResponse(token)

  await assignToken(token)
  await fetchAuthUser(auth_user_id)
}

async function fetchAuthUser(_id: any) {
  await store.dispatch('users/getAuthUser', _id)
}
async function assignToken(token: any) {
  await store.dispatch('users/assignToken', token)
}
