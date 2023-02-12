const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");
let mongoose = require("mongoose");
let request = require('request');
let https = require('https')
const app = express();


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res)=>{
  res.render('index')
});

app.post("/", (req, res) => {
var firstname = req.body.firstname;
var lastname = req.body.lastname;
var email = req.body.email;

var data ={
members:[
  {
    email_address: email,
    status: "subscribed",
    merge_fields:{
      FNAME: firstname,
      LNAME: lastname,
    }
  }
]
};
var jsonData = JSON.stringify(data);
var url = "https://us14.api.mailchimp.com/3.0/lists/43aee9087e";
var options = {
  method:"POST",
  auth : "newsletter:0c8b16bf9950da540c3f69d3bc1dbfa5-us14"
}
var request = https.request(url, options, function(response){
  if(response.statusCode === 200){
    res.render("final");
  }else{
    res.render("error");
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();
});

app.post("/error",function(req,res){
  res.redirect('/')
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000
};

app.listen(process.env.PORT || 3000, function() {
  console.log("welcome to 3k")
});
