import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Explore from './pages/explore';
import Lost from './pages/lost';
import About from './pages/about';
import Privacy from './pages/privacy';
import SubPageExplore from './pages/subpagedept';
import CourseSubPage from './pages/subpagecourses';
import CoursesPage from './pages/courses';
import Homebackground from './pages/homepage';
import ElectiveHome from './elective-finder/home';
import Faq from './pages/faq';
import ProfessorsPage from './pages/profs';
import UndergradPrograms from './pages/programs';
import GradPrograms from './pages/gradprograms';
import Faculties from './pages/faculties';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homebackground />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='explore/courses' element={<CoursesPage />} />
                <Route path='/explore/courses/:dept' element={<SubPageExplore />} />
                <Route path='/explore/courses/:dept/:code' element={<CourseSubPage />} />
                <Route path='/explore/programs/' element={<UndergradPrograms />} />
                <Route path='/explore/programs/grad' element={<GradPrograms />} />
                <Route path='/explore/professors' element={<ProfessorsPage />} />
                <Route path='/explore/faculty' element={<Faculties />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='/about' element={<About />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/find' element={<ElectiveHome />} />
                <Route path='/lost' element={<Lost />} />
                <Route path="*" element={<Navigate to="/lost" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
