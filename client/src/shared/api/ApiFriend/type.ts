export type Friend<T extends 'accepted' | 'pending'> = {
    _id: string
    recipient: Recipient
    connected: boolean
    status: T
}

export interface Recipient {
    username: string
    userId: string
    __v: number
}