export type Friend = {
    _id: string
    recipient: {
        username: string
        userId: string
        __v: number
    }
    status: 'accepted'
}