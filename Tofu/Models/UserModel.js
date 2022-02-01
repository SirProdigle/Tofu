import test from "ava";

const mongoose = require('mongoose'),Schema = mongoose.Schema,
    root = require("app-root-path"),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    Logger = require(`${root}/Engine/Logger/`)
import { isEmail } from 'validator';


const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [isEmail,"Must be a valid email address"]
    },
    password: {
        type: String,
        required: true,

    }

});

UserSchema.pre('save', async function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    await bcrypt.genSalt(SALT_WORK_FACTOR, async function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        await bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

//TODO unsure if this actually works since we're generating a salt?
UserSchema.methods.CheckPassword = async (testingPassword) => {
    await bcrypt.compare(testingPassword, this.password)
        .catch(err => Logger.error(err))
        .then(isSame => {return isSame} )
}



const User = mongoose.model("User",UserSchema);
module.exports = User;        
