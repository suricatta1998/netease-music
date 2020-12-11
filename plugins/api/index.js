import actions from './actions'

export default ({ $request }, inject) => {
  inject('api', {
    ...actions($request)
  })
}
