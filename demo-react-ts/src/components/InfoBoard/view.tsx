import * as React from 'react';
import { IInfoBoardProps } from './type';

class InfoBoard extends React.Component<IInfoBoardProps, {}> {
  constructor(props: IInfoBoardProps) {
    super(props);
  }
  render(): JSX.Element {
    return (
      <div>
        <button onClick={this.props.handleRestart}>Restart</button>
        <h2>{this.props.result}</h2>
      </div>
    );
  }
}

export default InfoBoard;
