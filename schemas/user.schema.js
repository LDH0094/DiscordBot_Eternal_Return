const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: { type: String, required: true },
  erName: { type: String, required: true },
  profileDescription: { type: String },
  characters: { type: [String], required: true },
  rank: {type: String, require: true},
  profileUrl: {type: String, require: true},
  power: { type: Number},
  pogList: [{ type: Schema.Types.ObjectId, ref: 'Event' }], // Reference to EventModel
});

const UserModel = model('User', userSchema);

module.exports = UserModel;
