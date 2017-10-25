import * as React from 'react';

import './style';

export interface SquareProps {
  status: '' | 'X' | 'O'
};

const Square = (props: SquareProps) => <div className='square'>{props.status}</div>;

export default Square;