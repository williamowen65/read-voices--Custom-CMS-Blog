import {
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import PageNotFound from "./pages/404/PageNotFound";
import About from "./pages/about/About";
import Auth from "./pages/auth/Auth";
import Create from "./pages/create/Create";
import Donate from "./pages/donate/Donate";
import Home from "./pages/home/Home";

const AppRoutes = () => (
    <Routes>
        <Route
            path='/'
            exact
            element={<Home />}
        />
        <Route path='/auth' element={<Auth />} />
        <Route
            path='/about'
            element={<About />}
        />
        <Route
            path='/donate'
            element={<Donate />}
        />
        <Route
            path='/create'
            element={<Create />}
        />
        <Route
            path='*'
            element={<PageNotFound />}
        />
        {/* <Route
            path='/story/:slug'
            element={<Story />}
        />
       
            } */}
    </Routes>
);

function App() {
    return (
        <div className='App'>
            <AppRoutes />
        </div>
    );
}

export default App;
