import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

import { Tasks } from '../api/tasks';

class Task extends React.Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
    showPrivateButton: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    this.toggleChecked = this.toggleChecked.bind(this);
    this.deleteThisTask = this.deleteThisTask.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
  }

  toggleChecked() {
    const { _id, checked } = this.props.task;
    Meteor.call('tasks.setChecked', _id, !checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
  }

  render() {
    const checked = !!this.props.task.checked;
    const taskClassName = classnames({
      checked: checked,
      private: !!this.props.task.private
    });
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>&times;</button>
        <input type="checkbox" readOnly checked={checked}
          onClick={this.toggleChecked}/>
        {
          this.props.showPrivateButton ?
          (
            <button className="toggle-private" onClick={this.togglePrivate}>
              { this.props.task.private ? 'Private' : 'Public' }
            </button>
          ) :''
        }
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
}

export default Task;
