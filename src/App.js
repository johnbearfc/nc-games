import { useState } from "react";
import { Switch, Route } from "react-router";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import SelectedReview from "./components/SelectedReview";

function App() {
  const [reviewData, setReviewData] = useState({reviews: [], total_count: null});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Route exact path='/'>
          <Home 
            reviewData={reviewData} setReviewData={setReviewData}
            loading={loading} setLoading={setLoading}
            err={err} setErr={setErr}
          />
        </Route>
        <Route exact path='/reviews'>
          <Reviews 
            reviewData={reviewData} setReviewData={setReviewData}
            loading={loading} setLoading={setLoading}
            err={err} setErr={setErr}
          />
        </Route>
        <Route exact path='/reviews/:review_id'>
          <SelectedReview 
          loading={loading} setLoading={setLoading}
          err={err} setErr={setErr}
          />
        </Route>
        <Route exact path='/login'>
          <LogIn
          err={err} setErr={setErr}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
