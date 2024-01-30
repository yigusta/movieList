import { Route, Routes } from 'react-router-dom';
import './App.css';
import MovieList from './pages/MovieList';
import AddMovie from './pages/AddMovie';
import MovieEdit from './pages/MovieEdit';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<MovieList/>} />
      <Route path='/addMovie' element={<AddMovie/>} />
      <Route path='/editMovie/:id' element={<MovieEdit/>} />
     </Routes>
    </div>
  );
}

export default App;
