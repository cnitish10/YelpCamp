const express=require('express')
const campground = require('../models/campground')
const router=express.Router()
const Campground=require('../models/campground')
const middleware=require('../middleware/index.js')
router.get('/',(req,res)=>{
    Campground.find({},(err,campgrounds)=>{
        if(err)console.log(err)
        else res.render('campgrounds/index' ,{campground:campgrounds})
    })
    
})
router.post('/',middleware.isLoggedIn,(req,res)=>{
    const name=req.body.name;
    const price=req.body.price;
    const image=req.body.image;
    const description=req.body.description;
    const author={
        id:req.user._id,
        username:req.user.username
    }
Campground.create({
    name:name,
    image:image,
    price:price,
    description:description,
    author:author
},(err,campground)=>{
    if(err) console.log(err)
    else res.redirect('/campgrounds')
})
    
    
})
router.get('/new',middleware.isLoggedIn,(req,res)=>{
 req.flash('error','you need to log in')
    res.render('campgrounds/new')  
})
router.get('/:id',(req,res)=>{
    Campground.findById(req.params.id).populate('comments').exec((err,campground)=>{
        if(err)console.log(err)
        else  res.render('campgrounds/show',{campground:campground});
    })
   
})
router.get('/:id/edit',middleware.checkCampgroundOwnerShip,(req,res)=>{
    
        Campground.findById(req.params.id,(err,foundCamp)=>{

                res.render('campgrounds/edit',{campground:foundCamp})
            
            } )
        
    
  
 
    })
    
    router.put('/:id',middleware.checkCampgroundOwnerShip,(req,res)=>{
        Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCamp)=>{
            if(err)res.redirect('/campgrounds')
            else
        res.redirect('/campgrounds/'+req.params.id)
        })
    })
    router.delete('/:id',middleware.checkCampgroundOwnerShip,(req,res)=>{
        Campground.findByIdAndRemove(req.params.id,(err)=>{
            res.redirect('/campgrounds')
        })
    })
 

module.exports=router