  import React from "react";
  import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


  import Homepage from "./Homepage";
  import Nav from "./Nav";
  import Products from "./Products";
 

  const App = () => {

    return (
      <div className="App">
        <Router>
          <Nav></Nav>
          <div className="main">
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/products" component={Products} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  };

  export default App;
