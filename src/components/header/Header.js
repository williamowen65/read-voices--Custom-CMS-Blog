import React from "react";
import styled from "styled-components";
import "./styles/_header.scss";
import {
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-setup";
import { BsFilter } from "react-icons/bs";

export default function Header() {
    const { loggedIn } = useSelector((state) => {
        return state.app;
    });
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = (e) => {
        signOut(auth)
            .then(() => {
                console.log("user signed out");
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <HeaderStyled id='header'>
            {loggedIn && (
                <BiLogOut
                    onClick={handleLogout}
                    className='logout'
                    size={30}
                />
            )}
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
            </div>
            {location.pathname === "/" && (
                <BsFilter
                    size={30}
                    className='filter'
                />
            )}
            <hr />
        </HeaderStyled>
    );
}

const HeaderStyled = styled.header``;
