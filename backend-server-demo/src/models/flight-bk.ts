import { IFlight } from './../types/flight';
import { model, Schema } from 'mongoose'

const flightSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        required: true
    }

}, { timestamps: true })


export default model<IFlight>('Flight', flightSchema)