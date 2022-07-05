import { Router } from "express";
import { reviewspost, getreview } from '../controllers/reviewController'

const router = Router()


router.post('/review/:productid', reviewspost)
router.get('/review/:productid', getreview)


export default router