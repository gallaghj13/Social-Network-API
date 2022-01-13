const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
       username: {
           type: String,
           trim: true,
           unique: true,
           required: true,
       },
       email: {
           type: String,
           unique: true,
           required: true,
           match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
       },
       thoughts: [
           {
               type: Schema.Types.ObjectId,
               ref: 'Thought'
           }
       ],
       friends: [
           {
               type: Schema.Types.ObjectId,
               ref: 'User'
           }
       ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual property 'friendCount' that retrieves the length of the user's friends array field on query
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

// Initialize User model
const User = model('user', userSchema);

module.exports = User;