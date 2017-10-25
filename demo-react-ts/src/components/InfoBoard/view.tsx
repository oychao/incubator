import * as React from 'react';
import { IInfoBoardProps } from './type';

class InfoBoard extends React.Component<IInfoBoardProps, {}> {
  constructor(props: IInfoBoardProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>{this.props.result}</h2>
        <button onClick={this.props.resetStatus}>Restart</button>
      </div>
    );
  }
}

export default InfoBoard;
