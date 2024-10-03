import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homebackground from './homebackground';
import Explore from './explore';
import Lost from './lost';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homebackground />} /> {/* Homepage route */}
                <Route path='/explore' element={<Explore />} />
                <Route path='/lost' element={<Lost />} />
                <Route path="*" element={<Navigate to="/lost" />} /> {/* Redirect any unmatched routes to the homepage */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
