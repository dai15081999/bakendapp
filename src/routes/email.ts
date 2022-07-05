
import { Router } from "express";
const router = Router()
import { checkmail, getmail } from './../controllers/mailController';
import {admin_middleware, auth_middleware} from '../middlewares/auth_middleware'


router.post('/sendmail', checkmail)
router.get('/sendmail', getmail)

export default router