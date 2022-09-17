import { configureStore } from '@reduxjs/toolkit'
import { userState } from './user'

export const store= configureStore({
    reducer: {
        userState: userState.reducer
    }, 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch