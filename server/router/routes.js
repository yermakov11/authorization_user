const Router=require('express').Router;
const router=new Router();
const userController=require('../controllers/userController');
const {body}=require('express-validator');
const authMiddleware=require('../middleware/authMiddleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:6,max:20}),
    userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link',userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware,userController.getUsers)

module.exports=router;