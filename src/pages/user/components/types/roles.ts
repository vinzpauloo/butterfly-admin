export enum RoleEnum  {
    GOD = 1,
    OPERATIONS = 2,
    CC = 3,
    SA = 4,
    AGENT = 5
}

export interface IRoles {
    created_at? : string
    deleted_at? : any
    description? : string
    id : number
    name : string
    partner_id? : number | null
    updated_at : string
}