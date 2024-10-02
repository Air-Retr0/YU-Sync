import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homebackground from './homebackground';
import Explore from './explore';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Homebackground />} /> {/* Homepage route */}
                <Route path='/explore' element={<Explore />} />
                <Route path="*" element={<Navigate to="/home" />} /> {/* Redirect any unmatched routes to the homepage */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
