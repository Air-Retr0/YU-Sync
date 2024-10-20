import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Explore from './pages/explore';
import Lost from './pages/lost';
import About from './pages/about';
import Privacy from './pages/privacy';
import SubPageExplore from './pages/subpagedept';
import CourseSubPage from './pages/subpagecourses';
import UserSignUp from './pages/signup';
import UserSignIn from './pages/signin';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserSignUp />} />
                <Route path='/signin' element={<UserSignIn />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/lost' element={<Lost />} />
                <Route path='/about' element={<About />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/explore/:dept' element={<SubPageExplore />} />
                <Route path='/explore/:dept/:code' element={<CourseSubPage />} />
                <Route path="*" element={<Navigate to="/lost" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
