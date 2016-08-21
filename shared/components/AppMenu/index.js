import React from 'react';
import { Link } from 'react-router';
import styles from './index.css';

export default class AppMenu extends React.Component {
  render () {
    return (
      <div className={ styles.AppMenuContainer }>
        <div className={ styles.AppMenuLogo }>
          <Link to='/'>
            <h1 className={ styles.AppMenuTitle }>Pokédex</h1>
          </Link>
        </div>
      </div>
    );
  }
}
