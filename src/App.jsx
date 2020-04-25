import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import WebFont from 'webfontloader';
import Main from "./pages/Main";

WebFont.load({
  google: {
    families: ['Baloo Bhaina 2']
  }
});

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
