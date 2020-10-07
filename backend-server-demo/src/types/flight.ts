import { Document } from 'mongoose'

export interface IFlight extends Document {
    name: string
    description: string
    status: boolean
}