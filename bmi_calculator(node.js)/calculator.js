const express =require('express');
const bodyParser=require('body-parser');

const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var result=Number(req.body.num1)+Number(req.body.num2);
    res.send("The sum of given nos. is "+ result);
});

app.get("/bmicalculator",function(req,res){
    res.sendFile(__dirname+"/bmi.html")
})

app.post("/bmicalculator",function(req,res){
    var result2=parseFloat(req.body.weight)/(parseFloat(req.body.height)*parseFloat(req.body.height));
    res.send("Your BMI is "+result2);
})

app.listen(3000,function(){
    console.log('server started');
});
