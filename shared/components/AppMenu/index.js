import React from 'react';
import styles from './index.css';

export default class AppMenu extends React.Component {
  render () {
    return (
      <div className={ styles.AppMenuContainer }>
        <div className={ styles.AppMenuLogo }>
          <h1 className={ styles.AppMenuTitle }>Pokédex</h1>
        </div>
      </div>
    )
  }
}
