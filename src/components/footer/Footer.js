import React from "react";
import styled from "styled-components";
import "./styles/_footer.scss";
import {
    NavLink,
    useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ContentPadding } from "../SpecialContainers";

export default function Footer() {
    const location = useLocation();
    const { loggedIn } = useSelector(
        (state) => state.app
    );
    return (
        <FooterStyled>
            <ContentPadding>
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
                {location.pathname.includes(
                    "about"
                ) && (
                    <div className='promoContainer'>
                        <p>
                            Looking for your own
                            custom website?
                        </p>
                        <p>
                            Contact{" "}
                            <a
                                href='mailto://william.owen.dev@gmail.com'
                                className='promo'
                            >
                                William Owen
                            </a>
                        </p>
                    </div>
                )}
                <div className='mainFooter'>
                    <NavLink to='/about'>
                        About
                    </NavLink>{" "}
                    |{" "}
                    <NavLink to='/donate'>
                        Donate
                    </NavLink>
                </div>
            </ContentPadding>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer``;
