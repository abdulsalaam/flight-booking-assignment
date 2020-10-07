import { Document, Schema, HookNextFunction, model } from 'mongoose';

export interface IFreight {
    origin: string;
    destination: string;
	date: string;
	departureTime: string;
    arrivalTime: string;
    price: number;
	duration?: number;
    seats?: number;
	flightNo: string;
    name?: string;
}


export interface IFlightDocument extends IFreight, Document {}

const flight = new Schema<IFlightDocument>(
    {
        origin: {
            type: String,
        },
        destination: {
            type: String,
        },
		date: {
            type: String,
        },
		departureTime: {
            type: String,
        },
        arrivalTime: {
            type: String,
        },
        price: {
            type: Number,
        }
		duration : {
			type:Number,
		}
        seats: {
            type: Number,
        }
        code: {
            type: String,
        }
		flightNo: {
            type: String,
        },
        name: {
            type: String,
        }
    },
    { timestamps: { createdAt: 'createdate', updatedAt: 'updatedate' } }
);

// tslint:disable-next-line: only-arrow-functions
flight.pre('aggregate', function(next: HookNextFunction) {
    this.pipeline().unshift(
        {
            $project: { id: '$_id', other: '$$ROOT' },
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: ['$$ROOT', '$other'] } },
        },
        {
            $project: { other: 0, _id: 0 },
        }
    );

    next();
});

export const Flight = model<IFlightDocument>('flights', flight);
