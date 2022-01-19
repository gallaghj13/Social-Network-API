const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .populate('reactions')
          .select('-__v')
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .populate('reactions')
          .select('-__v')
          .then((thought) =>
            !thought  
              ? res.status(404).json({ message: 'No thought with that Id'})
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
          .then((dbThoughtData) => {
            return User.findOneAndUpdate(
              { username: req.body.username },
              { $push: { thoughts: dbThoughtData._id} },
              { new: true }
            ).then((user) => 
              !user
                ? res.status(404).json({ message: "No user with this ID"})
                : res.json(user)
            )
          })
          .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
          .then((thought) => 
            !thought
              ? res.staus(404).json({ message: 'No thought with this id'})
              : res.json(thought)
          )
          .catch((err) => {
              console.log(err);
              res.status(500).json(err);
          });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought 
            ? res.status(404).json({ message: 'No thought with this id'})
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({
              message: 'no user with this id!',
              })
            : res.json({ message: 'Thought successfully deleted!' })
      )
        .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought  
              ? res.status(404).json({ message: 'No thought with this id' })
              : res.json(thought)
          )
          .catch((err)  => {
            console.log(err);
            res.status(500).json(err)
          });
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this is'})
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
}