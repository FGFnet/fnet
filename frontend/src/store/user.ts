import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    login: boolean;
    auth: boolean;
}

const initialState: UserState = {
    login: false,
    auth: true
}

export const userState = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setLogin: state => {
            state.login = true
        },
        setLogout: state => {
            state.login = false
            state.auth = false
        }
    }
})

export const {setLogin, setLogout} = userState.actions
export default userState.reducer