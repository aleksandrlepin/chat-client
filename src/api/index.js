import { message } from 'antd'
import { serialize } from '../utils/common'

const MODE = 'cors'
const HEADERS = new Headers({
  'Content-Type': 'application/json',
})
const SERVER_URL = 'https://localhost:3001' // TODO: Lepin > move to config

const sendRequest = (url, method, body) => {
  const options = {
    method,
    headers: HEADERS,
    mode: MODE,
  }
  const serializedBody = serialize(body)
  if (serializedBody) {
    options.body = serializedBody
  }
  const promise = fetch(`${SERVER_URL}${url}`, options)
    .then(response => {
      if (response.status < 500) {
        return response.json()
      }
      throw response.json()
    })
    .catch(async err => {
      const error = await err
      console.error(error.message)
      message.error('Sorry. Something went wrong. Try again later.')
    })
  return promise
}

const get = (url) => sendRequest(url)
const post = (url, body) => sendRequest(url, 'POST', body)


// api methods
const addUser = (body) => {
  const link = '/users/signup'
  return post(link, body)
}

const loginUser = (body) => {
  const link = '/users/login'
  return post(link, body)
}

const loginFbUser = (body) => {
  const link = '/users/login-fb'
  return post(link, body)
}

const checkBy = (name) => {
  const link = `/users/check/name/${name}`
  return get(link)
}

const checkUserEmail = (email) => {
  const link = `/users/check/email/${email}`
  return get(link)
}

const refreshAccessToken = (body) => {
  const link = '/users/token/refresh'
  return post(link, body)
}

const getUsers = () => {
  const link = '/users'
  return get(link)
}

const getUserChats = (id) => {
  const link = `/users/${id}/chats`
  return get(link)
}

const nodeApi = {
  addUser,
  loginUser,
  loginFbUser,
  checkUserName,
  checkUserEmail,
  refreshAccessToken,
  getUsers,
  getUserChats,
}

export default nodeApi
