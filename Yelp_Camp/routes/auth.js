const express=require('express')
const router=express.Router()
const Campground=require('../models/campground')
const Comment=require('../models/comment')
const passport=require('passport')
const User=require('../models/user')

router.get('/',(req,res)=>{
    res.render('landing')
})



router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',(req,res)=>{
    const newUser=new User({username:req.body.username})
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){req.flash('error',err)
        return res.render('register')}
        passport.authenticate('local')(req,res,()=>{
            req.flash('success','welcome to yelpcamp '+user.username)
            res.redirect('/campgrounds')
        })
    })
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',passport.authenticate('local',{
    successRedirect:'/campgrounds',
    failureRedirect:'/login'
}),(req,res)=>{
    req.flash('error','unknown user')
res.redirect('/')
})
router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success','Logged You Out')
    res.redirect('/campgrounds')
})

module.exports=router