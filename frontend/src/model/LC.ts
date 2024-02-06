import { FG } from "./user"

export type LC = {
    id : number ,
    fg_n_id : FG ,
    fg_s_id : FG ,
    schedule : number ,
    name : string,
    total : number
}

export type Schedule = {
    date : Date,
    day : number
}