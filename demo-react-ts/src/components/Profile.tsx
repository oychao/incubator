import * as React from 'react';

export interface ProfileProps { username: string }

export default class Profile extends React.Component<ProfileProps, {}> {
  render() {
    return <h1>{this.props.username}</h1>;
  }
}