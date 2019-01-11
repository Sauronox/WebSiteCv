const mongoose = require('mongoose');
let bcrypt   = require('bcrypt-nodejs');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {type: String,lowercase: true, required: true},
    password: {type: String,required: true}
});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);