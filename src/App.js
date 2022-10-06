import {
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";

const AppRoutes = () => (
    <Routes>
        <Route
            path='/'
            exact
            element={<Home />}
        />
        <Route path='/auth' element={<Auth />} />
        {/* <Route
            path='/story/:slug'
            element={<Story />}
        />
        <Route
            path='/create'
            element={<CreateStory />}
        />
        <Route
            path='/about'
            element={<About />}
        />
        <Route
            path='/donate'
            element={<Donate />}
        />
        <Route
            path='*'
            element={<PageNotFound />} */}
        />
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
