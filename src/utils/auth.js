import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_user_token'
const TimeStamp = 'hrsaas_time_key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return Cookies.get(TimeStamp)
}

export function setTimeStamp() {
  Cookies.set(TimeStamp, Date.now())
}
