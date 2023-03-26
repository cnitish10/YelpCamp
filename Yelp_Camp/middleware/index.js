const Commment=require('../models/comment')
const Campground=require('../models/campground')
const middleWareObj={}
middleWareObj.checkCampgroundOwnerShip=(req,res,next)=>{
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,(err,foundCamp)=>{
            if(err){
                req.flash('error','camp not found')
                res.redirect('/campgrounds')}
            else{
                if(foundCamp.author.id.equals(req.user._id))
                next()
                else {
                    req.flash('error','You dont have permission to do that')
                    res.redirect('back')
            
            } }
        })
    }
    else {
        req.flash('error','you need to be logged in to o that')
        res.redirect('back')
    }
}
middleWareObj.isLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','you need to be logged in to o that')
    res.redirect('/login')
}


module.exports=middleWareObj