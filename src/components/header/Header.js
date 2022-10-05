import React from "react";
import styled from "styled-components";
import "./styles/index.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const loggedIn = useSelector((state) => {
        return state.app.loggedIn;
    });

    const navigate = useNavigate();
    return (
        <HeaderStyled id='header'>
            <div>
                <h1
                    className='logo'
                    onClick={() => navigate("/")}
                >
                    Read Voices
                </h1>
                <p>
                    A brief description of the
                    page
                </p>
                <hr />
            </div>
        </HeaderStyled>
    );
}

const HeaderStyled = styled.header``;
