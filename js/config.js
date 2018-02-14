export const host = 'localhost:3000'
const baseUrl = `http://${host}`
const httpMethods = Object.freeze({ POST: 'post', GET: 'get' })
export default {
  url: {
    login: { path: `${baseUrl}/api/login`, method: httpMethods.POST },
    checkLogin: { path: `${baseUrl}/api/secure/test`, method: httpMethods.GET }
  }
}