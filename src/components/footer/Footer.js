import React from "react";
import styled from "styled-components";
import "./styles/_footer.scss";
import {
    NavLink,
    useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
    const location = useLocation();
    console.log(location);
    const { loggedIn } = useSelector(
        (state) => state.app
    );
    return (
        <FooterStyled>
            {!loggedIn && (
                <div className='actionBtn'>
                    {location.pathname.includes(
                        "/story/"
                    ) && (
                        <NavLink to='/'>
                            Looking for more
                            stories???
                        </NavLink>
                    )}
                </div>
            )}
            <NavLink to='/about'>About</NavLink> |{" "}
            <NavLink to='/donate'>Donate</NavLink>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer``;
