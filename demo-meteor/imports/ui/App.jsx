import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';
import { PropTypes } from 'prop-types';

import { Tasks } from '../api/tasks';

import Task from './Task';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      val: '',
      hideCompleted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleHideCompleted = this.toggleHideCompleted.bind(this);
  }

  handleChange(event) {
    this.setState({
      val: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Tasks.insert({
      text: this.state.val,
      createdAt: new Date()
    });
    this.setState({
      val: ''
    });
  }

  toggleHideCompleted() {
    const hideCompleted = !this.state.hideCompleted;
    this.setState({
      hideCompleted
    });
  }

  renderTasks() {
    const tasks = this.props.tasks.filter(task => {
      return !this.state.hideCompleted || !task.checked;
    });
    return tasks.map(task => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>
          <label className="hide-completed">
            <input type="checkbox" readOnly checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted}/>
            Hide Completed Tasks
          </label>
          <form className="new-task" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Type to add new tasks"
              value={this.state.val} onChange={this.handleChange}/>
          </form>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count()
  };
}, App);

