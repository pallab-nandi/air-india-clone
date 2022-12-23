const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
}, { timestamps : true });

UserSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
})

UserSchema.methods.isValidPass = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;