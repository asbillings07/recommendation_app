import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Navigation from './components/Navigation';
import './css/App.css';
function App() {
  return (
    <Router>
      <Route path="/" component={Navigation} />
      <div className="App">
        <header className="App-header">

        </header>
      </div>
      <div>
        <Route exact path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
