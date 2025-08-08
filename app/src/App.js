import {BrowserRouter,Route,Routes} from "react-router-dom";
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Main from './Components/Main';
import PageState from './Context/pages/PageState';
import ViewPage from "./Components/ViewPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
      <PageState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/view" element={<ViewPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PageState>
    </>
  );
}
export default App;
