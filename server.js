const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controller/register.js');
const signin = require('./controller/signin.js');
const profile = require('./controller/profile.js');
const image = require('./controller/image.js');
const db = knex({
  client: 'pg',
  connection: {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  }
});

const app = express();

app.use(bodyParser.json());



app.get('/',cors(),(req,res)=>{
	res.send("db.users");
})



app.post('/signin',cors(),(req, res) => {signin.handleSignin(req,res,db,bcrypt)} )

app.post('/register',cors(), (req, res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',cors(),(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image',cors(),(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',cors(),(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000,()=>{
	console.log('app is working')
})