import { TSquareStatus, ISquareProps } from './type';
import * as React from 'react';
import './style';

class Square extends React.Component<ISquareProps, {}> {
  constructor(props: ISquareProps) {
    super(props);
    this.handleMove = this.handleMove.bind(this);
  }
  handleMove(e: object): void {
    if (this.props.status !== 0) {
      return;
    }
    this.props.handleMove(this.props.id);
  }
  render(): JSX.Element {
    let piece: string = '';
    if (this.props.status === 1) {
      piece = 'O';
    } else if (this.props.status === 2) {
      piece = 'X';
    }
    return (<div className='square' onClick={this.handleMove}>{piece}</div>);
  }
}

export default Square;
