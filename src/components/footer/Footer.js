import React from "react";
import styled from "styled-components";
import "./styles/_footer.scss";
import {
    NavLink,
    useLocation,
} from "react-router-dom";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { ContentPadding } from "../SpecialContainers";
import { setActiveSlug } from "../../redux/appReducer";

export default function Footer() {
    const dispatch = useDispatch();
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
                    <div className='promoContainer'>
                        <p>
                            Looking for your own
                            custom website?
                        </p>
                        <p>
                            Contact{" "}
                            <a
                                href='mailto:william.owen.dev@gmail.com'
                                className='promo'
                            >
                                William Owen
                            </a>
                        </p>
                    </div>
                </div>
            </ContentPadding>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer``;
