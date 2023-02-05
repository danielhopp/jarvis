import { combineReducers } from 'redux'

import * as actions from './slices/'

const reducer = combineReducers(
  Object.entries(actions).reduce(
    (acc, [name, { reducer }]) => ({
      ...acc,
      [name]: reducer
    }),
    {}
  )
)

export default (state, action) => reducer(state, action)
