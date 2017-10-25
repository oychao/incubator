import { TSquareStatus, ISquareProps } from './type';
import * as React from 'react';
import './style';

class Square extends React.Component<ISquareProps, {}> {
  constructor(props: ISquareProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e: object) {
    if (this.props.status !== 0) {
      return;
    }
    this.props.handleClick(this.props.id);
  }
  render() {
    let piece: string = '';
    if (this.props.status === 1) {
      piece = 'O';
    } else if (this.props.status === 2) {
      piece = 'X';
    }
    return (<div className='square' onClick={this.handleClick}>{piece}</div>);
  }
}

export default Square;
