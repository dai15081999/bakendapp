import { Router } from "express";
import { deleteOrder, createOrder, getAllorder, getOrderId, updateStatus} from '../controllers/orderController'
import {auth_middleware, admin_middleware} from '../middlewares/auth_middleware'

const router = Router()


router.post('/order', createOrder)
router.get('/order/getorderuser/:id', getOrderId)
router.get('/order', getAllorder)
router.put('/order/:orderId', updateStatus)
router.put('/order/:orderId', updateStatus)
router.delete('/order/:orderId', deleteOrder)

export default router