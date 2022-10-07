import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    useNavigate,
    useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { setActiveSlug } from "../../redux/appReducer";

export default function EditNavAlert() {
    const dispatch = useDispatch();
    const location = useLocation();
    // alert("hey");
    // if()

    useEffect(() => {
        if (location.pathname === "/") {
            dispatch(setActiveSlug(null));
        }
    }, [location, dispatch]);

    return null;
}
