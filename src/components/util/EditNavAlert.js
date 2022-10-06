import React, { useEffect } from "react";
import {
    useNavigate,
    useLocation,
} from "react-router-dom";
import styled from "styled-components";

export default function EditNavAlert() {
    const location = useLocation();
    // alert("hey");
    // if()

    useEffect(() => {
        console.log(location);
    }, [location]);

    return null;
}
