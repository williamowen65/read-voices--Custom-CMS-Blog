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
import {
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-setup";

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
    if (footer) {
        const { p1, p2 } = footer;
    }
    const [isEditing, setIsEditing] =
        useState(false);
    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleReset = () => {
        const p1 = document.querySelector(".p1");
        const p2 = document.querySelector(".p2");
        setIsEditing(false);

        p1.innerText = footer.p1;
        p2.innerText = footer.p2;
    };

    const handleSaveFooter = () => {
        const p1 =
            document.querySelector(
                ".p1"
            ).innerText;
        const p2 =
            document.querySelector(
                ".p2"
            ).innerText;
        const docRef = doc(
            db,
            "website",
            "footer"
        );

        const docc = {
            p1,
            p2,
        };

        updateDoc(docRef, docc)
            .then(() => {
                setIsEditing(false);
            })
            .catch((err) => {
                console.error(err);
            });
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
                    <div className='footerContainer'>
                        {loggedIn && (
                            <div className='editWebsiteBtn'>
                                {!isEditing && (
                                    <RiEdit2Fill
                                        size={20}
                                        onClick={
                                            handleEdit
                                        }
                                    />
                                )}
                                {isEditing && (
                                    <>
                                        <AiFillSave
                                            size={
                                                20
                                            }
                                            onClick={
                                                handleSaveFooter
                                            }
                                        />
                                        <CgClose
                                            onClick={
                                                handleReset
                                            }
                                        />
                                    </>
                                )}
                            </div>
                        )}
                        <div
                            className={
                                isEditing
                                    ? "headerBox isEditing"
                                    : "headerBox"
                            }
                        >
                            <p
                                className='p1'
                                contentEditable={
                                    isEditing
                                }
                            >
                                {footer.p1}
                            </p>
                            <p
                                className='p2'
                                contentEditable={
                                    isEditing
                                }
                            >
                                {footer.p2}
                            </p>
                        </div>
                    </div>
                )}
            </ContentPadding>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer``;
