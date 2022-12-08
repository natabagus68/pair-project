const express=require('express')
const Controller = require('../Controller/Controller')
const router = express.Router()

router.get('/',Controller.home)
router.get('/register',Controller.register)
router.post('/register',Controller.postRegister)
router.get('/login',Controller.login)
router.post('/login',Controller.postLogin)

router.use((req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login?errors=You have to login first')
    }
    else {
        next()
    }
})
router.get('/successLogin',Controller.successLogin)
router.get('/addProfile',Controller.formProfile)
router.get('/logout',Controller.logOut)

router.use((req, res, next) => {
    if (req.session.userId && req.session.userRole!='Admin') {
        res.redirect('/successLogin?errors=You are not admin')
    }
    else {
        console.log(req.session.userId)
        next()
    }
})
router.get('/add',Controller.addForm)

module.exports=router