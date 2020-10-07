import { Response, Request } from 'express'
import { IFlight } from './../../types/flight'
import { Flight }  from '../../models/Flight'

const getFlights = async (req: Request, res: Response): Promise<void> => {
    try {
        const flights: IFlight[] = await Flight.find()
        res.status(200).json({ flights })
    } catch (error) {
        throw error
    }
}

const addFlight = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IFlight>
        const flight: IFlight = new Flight({
            origin: body.origin,
			destination: body.destination,
			date : body.date,
			departureTime : body.departureTime,
			arrivalTime: body.arrivalTime,
			price: body.price,
			seats: body.seats,
			flightNo: body.flightNo,
			name: body.name
        }) 
		
        const newFlight: IFlight = await flight.save()
        const allFlights: IFlight[] = await Flight.find()

        res.status(201).json({ message: 'Flight added', flight: newFlight, flights: allFlights })
    } catch (error) {
        throw error
    }
}

const updateFlight = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateFlight: IFlight | null = await Flight.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allFlights: IFlight[] = await Flight.find()
        res.status(200).json({
            message: 'Flight updated',
            flight: updateFlight,
            flights: allFlights,
        })
    } catch (error) {
        throw error
    }
}

const deleteFlight = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedFlight: IFlight | null = await Flight.findByIdAndRemove(
            req.params.id
        )
        const allFlights: IFlight[] = await Flight.find()
        res.status(200).json({
            message: 'Flight deleted',
            flight: deletedFlight,
            flights:allFlights,
        })
    } catch (error) {
        throw error
    }
}

export { getFlights, addFlight, updateFlight, deleteFlight }
