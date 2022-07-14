import './styles/App.css';
import  { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import SortingApp from './components/SortingApp';
import PathfindingApp from './components/PathfindingApp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/sorting' element={<SortingApp/>}></Route>
          <Route path='/pathfinding' element={<PathfindingApp/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
