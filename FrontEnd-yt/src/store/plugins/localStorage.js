const  JWT = 'jwt'
const  IN = 'in'

const  init = localStorage[JWT]
const  linkedin = localStorage[IN]

const  plugin = store => {
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'auth/setToken':
        localStorage[JWT] = mutation.payload
        break
      case 'auth/resetToken':
        localStorage.removeItem(JWT)
        break
      case 'linkedin/setToken':
        localStorage[IN] = mutation.payload
        break
      case 'linkedin/resetToken':
        localStorage.removeItem(IN)
        break
    }
  })
}

export default plugin
export { init, linkedin }
