export type Friend = {
    _id: string
    recipient: Recipient
    connected: boolean
    status: 'accepted'
}

export interface Recipient {
    username: string
    userId: string
    __v: number
}