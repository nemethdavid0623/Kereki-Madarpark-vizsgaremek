import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import AnimalManager from './components/AnimalManager';
import AnimalsPage from './pages/AnimalsPage';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoot';
import AdminMenu from './components/AdminMenu';
import { AuthProvider } from './components/AuthContext';
import AnimalDelete from './components/AnimalDelete';
import Rules from './components/Rules';
import ForSalePage from './components/ForSalePage';
import PriceOpening from './components/PriceOpening';
import OpeningManager from './components/OpeningManager';
import LargeCard from './components/LargeCard';
function App() {
  return (

    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/Animals" element={<AnimalsPage/>}/>
        <Route path="/ForSalePage" element={<ForSalePage/>}></Route>
        <Route path="/Rules" element={<Rules/>}></Route>
        <Route path='/PriceOpening' element={<PriceOpening/>}></Route>
        <Route path="/Login" element={<Login/>}/>
        <Route path='/:id' element={<LargeCard/>}/>

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminMenu/>
            </ProtectedRoute>
          } 
        />
        <Route 
            path="/AnimalInput" 
            element={
              <ProtectedRoute>
                <AnimalManager/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/AnimalDelete" 
            element={
              <ProtectedRoute>
                <AnimalDelete/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/openings" 
            element={
              <ProtectedRoute>
                <OpeningManager/>
              </ProtectedRoute>
            } 
          />
      </Routes>
    </Router>
    </AuthProvider>
     
  )
}

export default App;