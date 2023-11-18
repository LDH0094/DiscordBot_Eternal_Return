const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  eventName: {type: String, required: true},
  startDate: { type: Date, required: true},
  isCanceled: { type: Boolean },
  isDone: { type: Boolean },
  finishedDate: { type: Date, required: true},
  canceledDate: { type: Date, required: true},
  participants: {type: [UserModel]}
});

const EventModel = model('Event', eventSchema);

module.exports = EventModel;
