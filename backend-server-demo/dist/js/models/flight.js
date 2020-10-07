"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
const mongoose_1 = require("mongoose");
const flight = new mongoose_1.Schema({
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
    },
    duration: {
        type: Number,
    },
    seats: {
        type: Number,
    },
    code: {
        type: String,
    },
    flightNo: {
        type: String,
    },
    name: {
        type: String,
    }
}, { timestamps: { createdAt: 'createdate', updatedAt: 'updatedate' } });
// tslint:disable-next-line: only-arrow-functions
flight.pre('aggregate', function (next) {
    this.pipeline().unshift({
        $project: { id: '$_id', other: '$$ROOT' },
    }, {
        $replaceRoot: { newRoot: { $mergeObjects: ['$$ROOT', '$other'] } },
    }, {
        $project: { other: 0, _id: 0 },
    });
    next();
});
exports.Flight = mongoose_1.model('flights', flight);
