import React from "react";
import styled from "styled-components";
import "./styles/_footer.scss";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <FooterStyled>
            <NavLink to='/about'>About</NavLink> |{" "}
            <NavLink to='/donate'>Donate</NavLink>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer``;
