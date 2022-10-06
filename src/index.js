import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import "./firebase-setup";
import { store } from "./redux/store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import FetchStories from "./components/util/FetchStories";
import AuthStateChange from "./components/util/AuthStateChange";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <FetchStories />
            <AuthStateChange />
            <BrowserRouter>
                <Header />

                <App />
                <Footer />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
