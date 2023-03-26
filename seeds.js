const mongoose=require('mongoose');
const Campground=require('./models/campground')
const Comment=require('./models/comment')
const data=[{
name:"new desert",
image:"https://images.unsplash.com/photo-1539183204366-63a0589187ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGNhbXBmaXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
description:""
},
{
    name:"new desert",
    image:"https://images.unsplash.com/photo-1576176539998-0237d1ac6a85?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    description:""
    },
    {
        name:"new desert",
        image:"https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bW91bnRhaW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        description:""
        }]
function seedDb(){
    Campground.deleteMany({},(err)=>{
        if(err)console.log(err);
        console.log('remove')
        data.forEach((x)=>{
            Campground.create(x,(err,camp)=>{
                if(err)console.log(err)
                else {
                    console.log('added')
                    Comment.create({
                        text:"nice place oi love it",
                        author:"nitish"
                    },(err,comment)=>{
                        if(err)console.log(err)
                        else{
                            console.log('added a comment')
                            camp.comments.push(comment)
                            camp.save()
                        }
                    })
                }
            })
        })
       // Campground.save();
    })
}
module.exports=seedDb;