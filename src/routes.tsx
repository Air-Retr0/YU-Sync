import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Explore from './pages/explore';
import Lost from './pages/lost';
import About from './pages/about';
import Privacy from './pages/privacy';
import SubPageExplore from './pages/subpagedept';
import CourseSubPage from './pages/subpagecourses';
import Homebackground from './pages/homepage';
import ElectiveHome from './pages/elective-finder/home';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homebackground />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/explore/:dept' element={<SubPageExplore />} />
                <Route path='/explore/:dept/:code' element={<CourseSubPage />} />
                <Route path='/lost' element={<Lost />} />
                <Route path='/about' element={<About />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/find' element={<ElectiveHome />} />
                <Route path="*" element={<Navigate to="/lost" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
