import React from 'react';
import './App.css';
import 'typeface-roboto';

function App() {
  return (
    <div className="App">
    <h2>Hello</h2>
      {process.env.NODE_ENV}
    </div>
  );
}

export default App;
