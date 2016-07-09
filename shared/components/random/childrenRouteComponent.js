import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

export default class Children extends React.Component {
  render () {
    return (
      <div>
        <Helmet title='Children' />
        <Link to='/'>Go to home route</Link>
        <h2>I'm the children route children!</h2>
      </div>
    );
  }
}
