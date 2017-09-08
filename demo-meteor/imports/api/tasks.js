import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
    if (! Meteor.userId()) {
      throw new Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdOn: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  'task.remove'(taskId) {
    check(taskId, String);
    Tasks.remove(taskId);
  },
  'task.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    Tasks.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  }
});