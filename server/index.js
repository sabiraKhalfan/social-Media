// after we installaing these npm modules we can either import them or require them.

const express= require('express');
const bodyParser=require('body-parser')
const mongoose =require('mongoose');
const cors = require('cors');




const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

//Router
const AuthRoute = require('./Router/AuthRouter')
const UserRoute =require('./Router/UserRouter')
const PostRoute =require('./Router/PostRouter')
const UploadRoute = require('./Router/UploadRouter') 




// this is the first instance of our server
const app = express();

//to serve images for public
app.use(express.static("public"));
app.use('/images',express.static("images"));


//Url Enccoded -This parser accepts only UTF-8 encoding of the body
//The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.

/*MIDDLEWARE */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());




mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
  .then(() => console.log('DB Connection Succesful'));

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is connected to port ${port}`))


//router Usage
app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/post',PostRoute);
app.use('/upload',UploadRoute);