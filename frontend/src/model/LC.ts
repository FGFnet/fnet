import { FG } from "./user"

export type LC = {
    id : number ,
    fg_n_id : number ,
    fg_s_id : number ,
    schedule : number ,
    name : string,
    total : number
}

export type Schedule = {
    date : Date,
    day : number
}