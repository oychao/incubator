import React from 'react';
import { PropTypes } from 'prop-types';

import { Tasks } from '../api/tasks';

class Task extends React.Component {
  constructor() {
    super();
    this.toggleChecked = this.toggleChecked.bind(this);
    this.deleteThisTask = this.deleteThisTask.bind(this);
  }

  toggleChecked() {
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked }
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
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

