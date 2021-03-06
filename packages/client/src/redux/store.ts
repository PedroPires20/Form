import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { exampleReducer } from "./modules/example/slice"
import { fieldsReducer } from "./modules/fields/slice"
import { formReducer } from "./modules/forms/slice"
import { optionsReducer } from "./modules/options/slice"
import { userReducer } from "./modules/user/slice"
import logger from "redux-logger"
import { resultsReducer } from "./modules/results/slice"

const store = configureStore({
  reducer: {
    example: exampleReducer,
    user: userReducer,
    form: formReducer,
    options: optionsReducer,
    fields: fieldsReducer,
    results: resultsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = (
  dispatch: AppDispatch,
  getState: () => RootState
) => void

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
