import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homebackground from './pages/homebackground';
import Explore from './pages/explore';
import Lost from './pages/lost';
import About from './pages/about';
import Privacy from './pages/privacy';
import Cookies from './pages/cookies';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homebackground />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/lost' element={<Lost />} />
                <Route path='/about' element={<About />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/cookies' element={<Cookies />} />
                <Route path="*" element={<Navigate to="/lost" />} /> {/* Redirect any unmatched routes to the homepage */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
