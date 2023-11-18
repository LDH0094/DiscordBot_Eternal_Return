const { Schema, model } = require('mongoose');
const UserModel = require('./user.schema');

const eventSchema = new Schema({
  eventName: {type: String, required: true},
  startDate: { type: Date, required: true},
  isCanceled: { type: Boolean },
  isDone: { type: Boolean },
  finishedDate: { type: Date},
  canceledDate: { type: Date},
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const EventModel = model('Event', eventSchema);

module.exports = EventModel;
