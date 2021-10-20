import { Switch, Route } from "react-router";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import SelectedReview from "./components/SelectedReview";

function App() {

  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Route exact path='/'>
          <Header />
        </Route>
        <Route exact path='/reviews'>
          <Reviews />
        </Route>
        <Route exact path='/reviews/:review_id'>
          <SelectedReview />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
