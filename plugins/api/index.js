import actions from './actions'
import normal from './normal'
import user from './user'

export default ({ $request }, inject) => {
  inject('api', {
    ...actions($request),
    ...normal($request),
    ...user($request)
  })
}
