import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import reducers from './reducers'

const promise = createPromise({ types: { fulfilled: 'success' } })

let store

function initStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(promise, thunkMiddleware, loadingBarMiddleware())
    )
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // after navigating to a page with a initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })

    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store
  }
  // Create the store once in the client
  if (!store) {
    store = _store
  }

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])

  return store
}
