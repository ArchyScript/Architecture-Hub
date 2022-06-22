import axios from 'axios'
// import { HandleAxiosRequest } from '../utilities'
// import { createAxiosInstance } from '.'

/* 
const http = createAxiosInstance()
send a POST request

axios({
    method: 'post',
    url: '/login',
    data: {
        firstName: 'Finn',
        lastName: 'Williams'
      }
    });
    
    axios shorthand
    axios.request(config)
    axios.get(url[, config])
    axios.delete(url[, config])
    axios.head(url[, config])
    axios.options(url[, config])
    axios.post(url[, data[, config]])
    axios.put(url[, data[, config]])
    axios.patch(url[, data[, config]])


    axios.post('/login', {
      firstName: 'Finn',
      lastName: 'Williams'
    });
    
.then((response) => {
  console.log(response);
}, (error) => {
  console.log(error);
});
    {
  // `data` is the response that was provided by the server
  data: {},
 
  // `status` is the HTTP status code from the server response
  status: 200,
 
  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',
 
  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},
 
  // `config` is the config that was provided to `axios` for the request
  config: {},
 
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
    */

const validateLoginDetails = (email: string, password: string) => {
  // if (!email)
}

type LoginCredentialsType = {
  email: string
  password: string
}

export const AuthApiService = {
  login(login_credentials: any) {
    const { email, password } = login_credentials

    console.log(login_credentials)

    // const request = () =>
    const response = axios
      .post('http://localhost:4000/api/auth/login', {
        email: email._value,
        password: password._value,
      })
      .then((response) => response)

    // console.log(request)
    return response
    // return HandleAuthRequest(request)
  },

  register(payload: any) {
    console.log('payload' + payload)
    // const request = () => http.post('/auth/register', payload)
    // console.log('request' + request)
    // return HandleAuthRequest(request)
  },

  resetPasswoord(payload: any) {
    // console.log('payload' + payload)
    // const request = () => http.post('/auth/reset-password', payload)
    // console.log('request' + request)
    // return HandleAuthRequest(request)
  },

  logout(payload: any) {
    // console.log('payload' + payload)
    // const request = () => http.post('/auth/reset-password', payload)
    // console.log('request' + request)
    // return HandleAuthRequest(request)
  },
}
