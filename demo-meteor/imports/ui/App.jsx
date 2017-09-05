import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';
import { PropTypes } from 'prop-types';

import { Tasks } from '../api/tasks';

import Task from './Task';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      val: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  renderTasks() {
    return this.props.tasks.map(task => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
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
  tasks: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch()
  };
}, App);

