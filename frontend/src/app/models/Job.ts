import { Firm } from "./Firm";
import { Garden } from "./Garden";

export type Job = {
    _id: string,
    gardenId: Garden,
    firmId: Firm,
    decoratorId: string,
    startDate: Date,
    endDate: Date,
    status: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}