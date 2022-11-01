import React, { useState } from "react";
import styled from "styled-components";
import "./styles/_footer.scss";
import { RiEdit2Fill } from "react-icons/ri";
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
import { AiFillSave } from "react-icons/ai";
import { CgClose } from "react-icons/cg";

export default function Footer() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { loggedIn, website } = useSelector(
        (state) => state.app
    );
    console.log(website);
    const footer = website.filter(
        (el) => el.id == "footer"
    )[0];
    const [isEditingTitle, setIsEditingTitle] =
        useState(false);
    const handleEditTitle = () => {
        setIsEditingTitle(true);
    };
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
                {footer && (
                    <div>
                        {loggedIn && (
                            <div className='editWebsiteBtn'>
                                {!isEditingTitle && (
                                    <RiEdit2Fill
                                        size={20}
                                        onClick={
                                            handleEditTitle
                                        }
                                    />
                                )}
                                {isEditingTitle && (
                                    <>
                                        <AiFillSave
                                            size={
                                                20
                                            }
                                            // onClick={
                                            //     // handleSaveTitle
                                            // }
                                        />
                                        <CgClose
                                        // onClick={
                                        //     // handleReset
                                        // }
                                        />
                                    </>
                                )}
                            </div>
                        )}
                        <p>{footer.p1}</p>
                        <p>{footer.p2}</p>
                    </div>
                )}
            </ContentPadding>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer``;
