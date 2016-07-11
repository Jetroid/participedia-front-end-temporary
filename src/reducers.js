var {combineReducers} = require('redux')
var {reducer: formReducer} = require('redux-form')

// XXX separate actions for UI and actions for content

import { SEARCHING, RECEIVED_DATA, SWITCH_CATEGORY, SET_LAYOUT,
         SET_SORT_ORDER, DO_RECENT_SEARCH } from './actions'

function searchEngine (state = { }, action) {
  switch (action.type) {
    case SEARCHING:
      return Object.assign({}, state, {
        query: action.query,
        searching: true
      })
    case DO_RECENT_SEARCH:
      return Object.assign({}, state, {
        query: 'recent',
        searching: true
      })
    case RECEIVED_DATA:
      return Object.assign({}, state, {
        caseData: action.caseData,
        searching: false
      })
    default:
      return state
  }
}

function uiReducer (state = {}, action) {
  switch (action.type) {
    case SWITCH_CATEGORY:
      return Object.assign({}, state, {
        category: action.category
      })
    case SET_SORT_ORDER:
      return Object.assign({}, state, {
        sort: action.sort
      })
    case SET_LAYOUT:
      return Object.assign({}, state, {
        layout: action.layout
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cases: searchEngine,
  ui: uiReducer,
  form: formReducer
})

export default rootReducer
