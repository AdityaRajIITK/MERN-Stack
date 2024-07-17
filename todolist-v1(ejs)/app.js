const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.use(express.static("public"));

var items=["Buy food" , "Cook Food", "Eat Food"];
var workItems=["attend class","make homework"];

app.get("/",function(req,res){
    let today=new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }; 

    let day= today.toLocaleDateString("en-US",options);
    res.render("list", {Day: day, newListItems:items});
});

app.post("/",function(req,res){

    item = req.body.newItem;
    console.log("hi");
    console.log(req.body);

    if(req.body.button == "Work Items"){
        workItems.push(item);
        res.redirect('/work'); 
    }
    else{
        items.push(item);
        res.redirect('/');
    }
})

app.get("/work",function(req,res){
    res.render("list", {Day: "Work Items", newListItems:workItems});
});


app.get("/about",function(req,res){
    res.render("about")
});

app.listen(3000, function () {
     console.log("server started at port 3000");
});