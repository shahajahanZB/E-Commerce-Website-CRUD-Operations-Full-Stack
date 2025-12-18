import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/home.tsx';
import About from './components/About.tsx';
import Profile from './components/Profile.tsx';
import ProductsPage from './components/products-page.tsx';
import Navigation from './components/navigation.tsx';
import { Routes} from 'react-router-dom';
function App() {
  return (
    <>
<header style={{background: "linear-gradient(90deg, #1e3a8a, #2563eb)"}}>
  <Navigation />
                <h1 style={{color: "#ffffff", padding: "16px"}}>Product Page</h1>
                </header>
        <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products-page" element={<ProductsPage />}/>
        <Route path="/About" element={<About />}/>
        <Route path="/profile" element={<Profile />}/>
        </Routes>
        </>
  );
}

export default App;
