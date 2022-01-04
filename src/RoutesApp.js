
  import {BrowserRouter, Route, Routes} from "react-router-dom"; // in react-router-dom v6, "Switch" is replaced by routes "Routes"
  
  import PageIndex from './Components/PageIndex.jsx';
  import PageEmployees from './Components/PageEmployees.jsx';

  function RoutesApp() {
      return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<PageIndex />}></Route>
                <Route path="/employees" element={<PageEmployees />}></Route>
            </Routes>
        </BrowserRouter>

      )
  }
  
  export default RoutesApp;