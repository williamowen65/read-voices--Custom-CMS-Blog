import React from "react";
import styled from "styled-components";
import "./styles/_footer.scss";
import {
    NavLink,
    useLocation,
} from "react-router-dom";

export default function Footer() {
    const location = useLocation();
    console.log(location);
    return (
        <FooterStyled>
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
            <NavLink to='/about'>About</NavLink> |{" "}
            <NavLink to='/donate'>Donate</NavLink>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer``;
