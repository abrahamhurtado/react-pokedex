import React from 'react';
import Helmet from 'react-helmet';
import AppMenu from '../AppMenu';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Helmet title="Pokédex"/>
        <AppMenu />
        { this.props.children }
      </div>
    );
  }
}
