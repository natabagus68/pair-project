const { User,Profile,Post } = require('../models/index')
const bcrypt = require('bcryptjs')
class Controller {
    static home(request, response) {
        response.render('home')
    }
    static register(request, response) {
        if(request.session.userId && request.session.userId && request.session.userRole==='User'){
           return response.redirect('/successLogin')
        }
        else if(request.session.userId && request.session.userRole==='Admin'){
            return response.redirect('/add')
        }
        else{
            response.render('register')
        }
    }
    static postRegister(request, response) {
        let { userName, password, email, role } = request.body
        User.create({ userName, password, email, role })
            .then((_) => {
                response.redirect('/login')
            }).catch((err) => {
                response.send(err)
            });
    }
    static login(request, response) {
        if(request.session.userId && request.session.userRole==='User'){
            response.redirect('/successLogin')
        }
        else if(request.session.userId && request.session.userRole==='Admin'){
            response.redirect('/add')
        }
        let errors = request.query.errors
        response.render('login',{errors})
    }
    static postLogin(request, response) {
        //user ada?? klo g ada, ya ttp stay atau tampilin pesan register dlu,klo ada, 
        // passwordnya bener ga (bandingin sama hash password)?? klo bener lanjut, klo kaga stay
        const { userName, password } = request.body
        User.findOne({
            where: {
                userName: userName
            }
        })
            .then((user) => {
                if (user) {
                    let isValidPassword = bcrypt.compareSync(password, user.password)
                    if(isValidPassword){
                        request.session.userId=user.id //set session di controller
                        request.session.userRole=user.role
                        if(request.session.userRole==="Admin"){
                            return response.redirect('/add')
                        }
                        else{
                            return response.redirect('/successLogin')
                        }
                    }
                    else{
                       return response.redirect('/login?errors=invalid password')
                    }
                }
                else{
                   return response.redirect('/login?errors=invalid userName')
                }
            })
            .catch((err) => response.send(err))
    }
    static successLogin(request, response) {
        let UserId =request.session.userId
        let errors=request.query.errors
            User.findOne({where:{
                id:UserId
            },include:{
                all:true
            }})
            .then((result)=>response.render('successLogin',{result,errors}))
            .catch((err)=>response.send(err))
        
    }
    static addPostForm(request,response){
        response.render('addPost')
    }
    static addPost(request,response){
        let UserId =request.session.userId
        let {title,content}=request.body
        Post.create({title,content,UserId})
        .then((_)=>response.redirect('/successLogin'))
        .catch((err)=>response.send(err))
    }
    static logOut(request,response){
        request.session.destroy((err)=>{
            if(err){
                console.log(err)
            }
            else{
                response.redirect('/login')
            }
        })
    }
    static addForm(request,response){
        User.allUsers()
        .then((result)=>response.render('addForm',{result}))
        .catch((err)=>response.send(err))
    }

    static formProfile(request,response){
        response.render('profiles')
    }
    static addProfile(request,response){
        let UserId = request.session.userId
        let {name,age,bio,profile_picture,gender}=request.body
        console.log(UserId)
        console.log(request.body)
        Profile.create({name,age,UserId,bio,profile_picture,gender})
        .then((_)=>response.redirect('/successLogin'))
        .catch((err)=>{
            console.log(err)
            response.send(err)
        })
    }
}
module.exports = Controller