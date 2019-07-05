const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// {
//     email: 'talhaiqabl801@gmail.com',
//     password: 'kjdfhoiufuiladjfkdjis',
//     tokens: [{
//         access: 'auth',
//         token: 'kjdhijflosajclkjclksj'
//     }]
// }

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: Boolean,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObj = user.toObject();

    return _.pick(userObj, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
    // Get the reference of the current user
    var user = this;

    // Populate the access and token variable
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    // Push to the user's token array
    user.tokens.push({
        access,
        token
    });

    // Push to the user's token array
    // user.tokens = user.tokens.concat([{access, token}]);

    // Save user to database and return the token to user
    return user.save().then(() => {
        return token;
    });
}

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
}