import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';

import { Tasks } from '../api/tasks';

class Task extends React.Component {
  constructor() {
    super();
    this.toggleChecked = this.toggleChecked.bind(this);
    this.deleteThisTask = this.deleteThisTask.bind(this);
  }

  toggleChecked() {
    const { _id, checked } = this.props.task;
    Meteor.call('tasks.setChecked', _id, !checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.prosp.task._id);
  }

  render() {
    const checked = !!this.props.task.checked;
    const taskClassName = checked ? 'checked' : '';
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>&times;</button>
        <input type="checkbox" readOnly checked={checked}
          onClick={this.toggleChecked}/>
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired
};

export default Task;

