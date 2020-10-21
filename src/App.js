import React from 'react';

import './App.css';
import ReleaseList from './components/ReleaseList';

export default class extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <p style={{color:"blue"}}>Project/ Env</p>
          <h3>Releases</h3>
          {/* <br /> */}
        </header>
        <hr />
        <br />
        <main className="Main">
          <ReleaseList />
        </main>
      </div>
    );
  }
}

