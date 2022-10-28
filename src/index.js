import React, {
    Suspense,
    useEffect,
} from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
    Provider,
    useSelector,
} from "react-redux";
import reportWebVitals from "./reportWebVitals";
import "./firebase-setup";
import { store } from "./redux/store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import FetchStories from "./components/util/FetchStories";
import AuthStateChange from "./components/util/AuthStateChange";
import EditNavAlert from "./components/util/EditNavAlert";
// import Dashboard from "./components/dashboard/Dashboard";
import favicon from "./assets/favicon.ico";
import BellMT from "./fonts/BellMT.ttf";
import playFairFont from "./fonts/PlayfairDisplay-Regular.ttf";
import FetchWebsite from "./components/util/FetchWebsite";

const Dashboard = React.lazy(() =>
    import("./components/dashboard/Dashboard.js")
);

const root = ReactDOM.createRoot(
    document.getElementById("root")
);
const Appp = () => {
    const { loggedIn } = useSelector(
        (state) => state.app
    );
    useEffect(() => {
        /// STYLE IMPORTS
        document
            .querySelector("head link[rel=icon]")
            .setAttribute("href", favicon);
        // console.log(BellMT);
    }, []);
    return (
        <div className='outerContainer'>
            <BrowserRouter>
                {loggedIn == true ? (
                    <Suspense fallback='loading'>
                        <Dashboard />
                    </Suspense>
                ) : null}
                <EditNavAlert />

                <div className='mainContainer'>
                    <Header />

                    <App />
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    );
};
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <FetchWebsite />
            <FetchStories />
            <AuthStateChange />
            <Appp />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
