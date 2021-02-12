import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper'

const promise = createPromise()

import reducers from './reducers'

const makeStore: MakeStore<any> = (_context: Context) =>
  createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(promise, thunkMiddleware, loadingBarMiddleware())
    )
  )

export const wrapper = createWrapper<any>(makeStore, { debug: false })
