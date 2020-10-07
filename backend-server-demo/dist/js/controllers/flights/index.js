"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlight = exports.updateFlight = exports.addFlight = exports.getFlights = void 0;
const Flight_1 = require("../../models/Flight");
const getFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flights = yield Flight_1.Flight.find();
        res.status(200).json({ flights });
    }
    catch (error) {
        throw error;
    }
});
exports.getFlights = getFlights;
const addFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const flight = new Flight_1.Flight({
            origin: body.origin,
            destination: body.destination,
            date: body.date,
            departureTime: body.departureTime,
            arrivalTime: body.arrivalTime,
            price: body.price,
            seats: body.seats,
            flightNo: body.flightNo,
            name: body.name
        });
        const newFlight = yield flight.save();
        const allFlights = yield Flight_1.Flight.find();
        res.status(201).json({ message: 'Flight added', flight: newFlight, flights: allFlights });
    }
    catch (error) {
        throw error;
    }
});
exports.addFlight = addFlight;
const updateFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateFlight = yield Flight_1.Flight.findByIdAndUpdate({ _id: id }, body);
        const allFlights = yield Flight_1.Flight.find();
        res.status(200).json({
            message: 'Flight updated',
            flight: updateFlight,
            flights: allFlights,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateFlight = updateFlight;
const deleteFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedFlight = yield Flight_1.Flight.findByIdAndRemove(req.params.id);
        const allFlights = yield Flight_1.Flight.find();
        res.status(200).json({
            message: 'Flight deleted',
            flight: deletedFlight,
            flights: allFlights,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteFlight = deleteFlight;
