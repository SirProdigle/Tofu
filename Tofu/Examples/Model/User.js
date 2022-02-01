const mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

//Schema for the model
userSchema = new Schema( {
    username: String,
    password: String
});

//Model functions should be attached to the schema for them to relate per model
//for model static functions use schemeName.statics
userSchema.methods.LogUser = function LogUser(callback){
    console.log("Username: " + this.username +"\nPassword: " + this.password  );

    //Used to callback a method after this function runs if it exists
    if(callback)
        callback();
};



//Grab user as a whole and export the full thing
User = mongoose.model('user', userSchema);
module.exports = User;