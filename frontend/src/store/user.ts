import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { FG } from '../model'

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
})

export const userState = atom<FG | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

export const accesstoken = atom<string>({
  key: 'accesstoken',
  default: '',
  effects_UNSTABLE: [persistAtom],
})
