import React from 'react';
import Helmet from 'react-helmet';
import Header from '../Header';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Helmet title="Pokédex"/>
        <Header />
        { this.props.children }
      </div>
    );
  }
}
