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
var allowedOrigins = ['http://localhost:3000',
                      'https://git.heroku.com/face-s.git'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.get('/',(req,res)=>{
	res.send("db.users");
})



app.post('/signin',(req, res) => {signin.handleSignin(req,res,db,bcrypt)} )

app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000,()=>{
	console.log('app is working')
})