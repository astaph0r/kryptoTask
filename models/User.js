const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    maxlength: 30,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  portfolio: [
    {
        symbol: {
            type: String
        },
        alertPrice : {
            type: Number
        }
        //unique: true
    } 
  ],
//   tokens: [
//     {
//       token: {
//         type: String,   
//         //unique: true,
//         //required: true
//       }
//     }
//   ]
});


module.exports = mongoose.model("User", userSchema);
