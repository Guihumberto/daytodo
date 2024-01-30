import { createPinia } from 'pinia'

export default createPinia(({$pinia, $router}) => {

  $pinia.use(({store}) => {
    store.router = $router
  })
})
