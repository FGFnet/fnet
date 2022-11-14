import {atom} from 'recoil';

type userStateType = {
    auth: boolean;
    login: boolean;
}
export const userState = atom<userStateType>({
    key: 'userState',
    default: {auth: false, login: false}
});
