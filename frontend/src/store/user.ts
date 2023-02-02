import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const {persistAtom} = recoilPersist()

export const userState = atom<number>({
  key: 'userState',
  default: -1,
  effects_UNSTABLE: [persistAtom]
})

export const accesstoken = atom<string>({
  key: 'accesstoken',
  default: '',
  effects_UNSTABLE: [persistAtom]
})