import * as React from 'react';

export interface HelloProps { msg: string };

const Hello = (props: HelloProps) => <h1>{props.msg}</h1>;

export default Hello;