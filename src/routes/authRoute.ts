import { Router } from 'express';
import {
    block,
    login,
    register,
    getuser,
    getalluser,
    forgot,
    updateavatar,
    changepassword,
    unblock,
    deleteuserbyid
} from '../controllers/authController';
import {
    auth_middleware,
    admin_middleware,
} from '../middlewares/auth_middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/forgot', forgot);
router.get('/getuser/:userId', getuser);
router.get('/getalluser', getalluser);
router.post('/updateavatar', updateavatar);
router.put('/changepassword', changepassword);
router.put('/block', block);
router.put('/unblock', unblock);
router.put('/deleteuserbyid', deleteuserbyid);

export default router;
