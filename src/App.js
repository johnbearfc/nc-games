import { useState } from "react";
import { Switch, Route } from "react-router";
import styled from "styled-components";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Nav from "./components/Nav";
import NewReview from "./components/NewReview";
import Reviews from "./components/Reviews";
import SelectedReview from "./components/SelectedReview";
import { UserProfile } from "./components/UserProfile";

const AppWrapper = styled.main`
  background-color: #fffcf2;
  color: #252422;

  font-family: georgia;

  h1,
  h2,
  h3,
  h4 {
    font-family: 'IM Fell English SC', serif;
  }

  .nav-link {
    color: black;
    text-decoration: none;
  }
`

function App() {
  const [reviewData, setReviewData] = useState({reviews: [], total_count: null});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  return (
    <AppWrapper className="App">
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
        <Route exact path='/reviews/submit'>
          <NewReview
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
        <Route exact path='/users/:username'>
          <UserProfile/>
        </Route>
      </Switch>
    </AppWrapper>
  );
}

export default App;
