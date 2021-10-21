import { useState } from "react";
import { Switch, Route } from "react-router";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import SelectedReview from "./components/SelectedReview";

function App() {
  const [reviewData, setReviewData] = useState({reviews: [], total_count: null});

  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Route exact path='/'>
          <Home reviewData={reviewData} setReviewData={setReviewData}/>
        </Route>
        <Route exact path='/reviews'>
          <Reviews reviewData={reviewData} setReviewData={setReviewData}/>
        </Route>
        <Route exact path='/reviews/:review_id'>
          <SelectedReview />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
