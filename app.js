const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
app.use(express.static);
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.listen(2000,()=>{
    console.log("App is running on port 2000")
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

// connect mongoDB
mongoose.connect("mongodb+srv://testDB:tutkuutku@tutku.wzgti.mongodb.net/MyDreamLove?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(error)=>{
    if(error){
        console.log("App cannot connect mongodb");
        console.log(error);
    }
    else{
        console.log("App connected with MongoDb successfully!");
    }
});

//create schema
const memberSchema=mongoose.Schema({
    userName:String,
    emailAdress:String,
    password:String,
    passwordCheck:String
});

//create model
const member=mongoose.model("members",memberSchema); 

//create
// member.create({
//     userName:"String",
//     emailAdress:"String",
//     password:"String",
//     passwordCheck:"String"
// },(error,memberCreated)=>{
//     if(error){
//         console.log("Member cannot created.");
//         console.log(error);
//     }
//     else{
//         console.log("Member is created as: "+memberCreated);
//     }
// });

//open home page


app.post("/register",(req,res)=>{
    const newMember=req.body;
    member.create({
        userName:newMember.userName,
        emailAdress:newMember.emailAdress,
        password:newMember.password,
        passwordCheck:newMember.passwordCheck
    },(error,memberCreated)=>{
        if(error){
            console.log("New member cannot inserted!");
            console.log(error);
        }
        else{
            console.log("New member is inserted succesfully as "+memberCreated);
            res.redirect("/index.html");
        }
    });
});