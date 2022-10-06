import React, { Suspense } from "react";
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
// import Dashboard from "./components/dashboard/Dashboard";

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
    console.log(typeof loggedIn);
    return (
        <div className='outerContainer'>
            <BrowserRouter>
                {loggedIn == true ? (
                    <Suspense fallback='loading'>
                        <Dashboard />
                    </Suspense>
                ) : null}

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
