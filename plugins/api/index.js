import actions from './actions'
import normal from './normal'

export default ({ $request }, inject) => {
  inject('api', {
    ...actions($request),
    ...normal($request)
  })
}
