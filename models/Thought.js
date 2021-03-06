const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
// Schema to create Thought model
const thoughtSchema = new Schema(
    {
       thoughtText: {
           type: String,
           required: true,
           minLength: 1,
           maxLength: 280,
       },
       createdAt: {
           type: Date,
           default: Date.now,
           get: timestamp => dateFormat(timestamp),
        //    Use a getter method to format the timestamp on query
       },
       username: {
           type: String,
           required: true,
           ref: 'user'
       },
       reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
      return this.reactions.length;
  });

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;