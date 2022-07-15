import './styles/App.css';
import  { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Sorting from './components/Sorting';
import Pathfinding from './components/Pathfinding';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/sorting' element={<Sorting/>}></Route>
          <Route path='/pathfinding' element={<Pathfinding/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
