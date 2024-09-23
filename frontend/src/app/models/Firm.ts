import { User } from "./User";

export type Firm = {
    name: string,
    address: string,
    services: string[],
    phoneNumber: string,
    location: string,
    employees: User[],
    pricing: Map<string, number>,
    averageRating: number,
    createdAt: Date
  };