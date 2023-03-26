require('dotenv').config()
const express=require('express');
const app=express(); 
const bodyParser= require('body-parser')
const mongoose=require('mongoose')
const passport=require('passport')
const passportLocal=require('passport-local')
const methodOverride=require('method-override')
const passportLocalMongoose=require('passport-local-mongoose')
const Campground=require('./models/campground')
const Comment=require('./models/comment')
const User=require('./models/user')
const seedDB=require('./seeds')
const flash=require('connect-flash')


const campgroundRoutes=require('./routes/campgrounds')
const commentRoutes=require('./routes/comments')
const authRoutes=require('./routes/auth')
mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,useFindAndModify:false })
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use(methodOverride('_method'))
app.set('view engine','ejs')
app.use(flash())
//PASSPORT CONFIGURATION

app.use(require('express-session')({
    secret:'anything',
    resave:false,
    saveUninitialized:false

}))
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.currentUser=req.user
    res.locals.error=req.flash('error')
    res.locals.success=req.flash('success')
    next()
})
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use('/campgrounds',campgroundRoutes)
app.use('/campgrounds/:id/comments',commentRoutes)
app.use(authRoutes)

const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log('running')
})