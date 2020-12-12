import actions from './actions'
import normal from './normal'
import user from './user'
import playlist from './playlist'
import song from './song'
import comment from './comment'

export default ({ $request }, inject) => {
  inject('api', {
    ...actions($request),
    ...normal($request),
    ...user($request),
    ...playlist($request),
    ...song($request),
    ...comment($request)
  })
}
