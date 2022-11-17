import { useCookie } from 'nuxt/app'

// composable/useAuth.js
export const useAuth = () => {
  // user login, sign out, sign up logic
  const adminAuth = useCookie('partnerAccessToken').value
  const isLoginStatus = () => {
    return !!adminAuth
  }

  return {
    isLoginStatus
  }
}
