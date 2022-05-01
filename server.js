const express=require('express');
const path=require('path');
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs');
const { Console } = require('console');

mongoose.connect('mongodb://localhost:27017/login-app-db',{
    useNewUrlParser:true,
    useUnifiedTopology:true

})
const app=express();

app.use('/',express.static(path.join(__dirname,'static')))
app.use(bodyParser.json())
app.post('/api/register', async(req, res) =>{
    const {username,password:plainTextPassword} = req.body;
    const password=await bcrypt.hash(plainTextPassword,10)

    res.json({status:'ok'})

    try{
        console.log('creating user')
        const response = await User.create({
                username,password
            } )
        console.log('user created succesfully',response)

    }catch(error){
            console.log(error.message)

            res.json({status:'error'})
    }
})

app.listen(3000,()=>{
    console.log("Served up at port 3000")
}

)