import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home';
import './css/App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Recommendation App</h1>

        </header>
      </div>
      <div>
        <Route exact path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
