export type Comment = {
    _id: string,
    userId: string,
    firmId: string,
    bookingId: string,
    rating: number,
    text: string,
    createdAt: Date
}