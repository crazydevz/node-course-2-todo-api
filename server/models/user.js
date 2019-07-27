const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
        required: true,
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

UserSchema.methods.generateAuthToken = async function() {
    // Get the reference of the current user
    var user = this;

    // Populate the access and token variable
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    // Push to the user's token array
    user.tokens.push({
        access,
        token
    });

    // Push to the user's token array
    // user.tokens = user.tokens.concat([{access, token}]);

    // Save user to database and return the token to user
    // return user.save().then(() => {
    //     return token;
    // });

    await user.save();
    return token;

}

UserSchema.methods.removeToken = function(token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    })
}

UserSchema.statics.findByToken = function(token) {
    User = this;
    var decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access' : 'auth'
    });
}

UserSchema.statics.findByCredentials = function(email, password) {
    User = this;

    return User.findOne({email}).then((user) => {
        if(!user) {
            console.log('User does not exist');
            return Promise.reject();
        }
        // return bcrypt.compare(password, user.password).then((res) => {
        //     if(true) {
        //         resolve(user);
        //     } else {
        //         console.log('typeof plain password: ', typeof password);
        //         console.log('typeof hashed password: ', typeof user.password);
        //         console.log('plain pasword:', password);
        //         console.log('hashed password: ', user.password);
        //         console.log('Incorrect password!');
        //         console.log('matches: ', res);
        //         reject();
        //     }
        // });
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}

UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
}