import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homebackground from './pages/homebackground';
import Explore from './pages/explore';
import Lost from './pages/lost';
import About from './pages/about';
import Privacy from './pages/privacy';
import SubPageExplore from './pages/subpagedept';
import CourseSubPage from './pages/subpagecourses';
import SignUp from './components/signup';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homebackground />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/lost' element={<Lost />} />
                <Route path='/about' element={<About />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/explore/:dept' element={<SubPageExplore />} />
                <Route path='/explore/:dept/:code' element={<CourseSubPage />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path="*" element={<Navigate to="/lost" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
