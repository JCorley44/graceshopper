import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
