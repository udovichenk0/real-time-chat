export type Friend = {
    _id: string
    recipient: Recipient
    status: 'accepted'
}

export interface Recipient {
    username: string
    userId: string
    __v: number
}