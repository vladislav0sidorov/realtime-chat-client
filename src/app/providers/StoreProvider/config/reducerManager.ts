import { Action, combineReducers, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema'


export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
  const reducers = { ...initialReducers }

  let combinedReducer = combineReducers(reducers)

  let keysToRemove: Array<StateSchemaKey> = []

  // const mountedReducers: OptionalRecord<StateSchemaKey, boolean> = {}

  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchema, action: Action) => {
      if (keysToRemove.length > 0) {
        state = { ...state }
        keysToRemove.forEach((key) => {
          delete state[key]
        })
        keysToRemove = []
      }
      return combinedReducer(state, action)
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return
      }
      reducers[key] = reducer

      combinedReducer = combineReducers(reducers)
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return
      }
      delete reducers[key]
      keysToRemove.push(key)
      combinedReducer = combineReducers(reducers)
    },
  }
}
