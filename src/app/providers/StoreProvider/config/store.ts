import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'

import { createReducerManager } from './reducerManager'
import { loginReducer } from '@/features/LoginByUsername'
import { userReducer } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import { usersReducer } from '@/entities/Users'
import { registerReducer } from '@/features/Register'
import { chatReducer } from '@/features/Chat'

export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    login: loginReducer,
    register: registerReducer,
    user: userReducer,
    users: usersReducer,
    chat: chatReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: true,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rtkApi.middleware),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
