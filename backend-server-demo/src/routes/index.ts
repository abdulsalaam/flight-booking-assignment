import { Router } from 'express'
import { getFlights, addFlight, updateFlight, deleteFlight } from '../controllers/flights'
 
const router: Router = Router()

router.get('/flights', getFlights)

router.post('/add-flight', addFlight)

router.put('/edit-flight/:id', updateFlight)

router.delete('/delete-flight/:id', deleteFlight)

export default router
