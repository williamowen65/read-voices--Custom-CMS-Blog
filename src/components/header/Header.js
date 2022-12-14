import React, { useMemo, useState } from "react";
import styled from "styled-components";
import "./styles/_header.scss";
import {
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase-setup";
import { GrAnalytics } from "react-icons/gr";
import { AiFillSave } from "react-icons/ai";
import {
    doc,
    updateDoc,
} from "firebase/firestore";
import { CgClose } from "react-icons/cg";

export default function Header() {
    const { loggedIn, website } = useSelector(
        (state) => {
            return state.app;
        }
    );

    const title = website.filter(
        (el) => el.id === "title"
    )[0];
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
    const [isEditingTitle, setIsEditingTitle] =
        useState(false);

    const handleEditTitle = () => {
        setIsEditingTitle(true);
    };
    const handleSaveTitle = () => {
        const title =
            document.getElementById(
                "title"
            ).innerText;
        const subtitle =
            document.querySelector(
                ".subTitle"
            ).innerText;
        const docRef = doc(
            db,
            "website",
            "title"
        );

        const docc = {
            title,
            subtitle,
        };

        updateDoc(docRef, docc)
            .then(() => {
                setIsEditingTitle(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleReset = () => {
        const titleEl =
            document.getElementById("title");
        const subtitle =
            document.querySelector(".subTitle");
        setIsEditingTitle(false);

        titleEl.innerText = title.title;
        subtitle.innerText = title.subtitle;
    };

    return (
        <HeaderStyled id='header'>
            {loggedIn && (
                <div className='websiteBtns'>
                    <GrAnalytics
                        onClick={() => {
                            window.open(
                                "https://console.firebase.google.com/u/0/project/read-voices-2/analytics/app/web:MGZhNGZhMGItODhmNC00MTE5LThmMzAtNTZlMzc3ZGQyYjUz/overview/~2F%3Ft%3D1666984305333&fpn%3D340433485596&swu%3D1&sgu%3D1&sus%3Dupgraded&params%3D_u..pageSize%253D25&cs%3Dapp.m.dashboard.overview&g%3D1",
                                "_blank"
                            );
                        }}
                        size={25}
                        className='websiteBtn'
                    />
                    <BiLogOut
                        onClick={handleLogout}
                        size={30}
                        className='websiteBtn'
                    />
                </div>
            )}
            <div
                className={
                    isEditingTitle
                        ? "headerBox isEditing"
                        : "headerBox"
                }
            >
                <h1
                    className='logo'
                    id='title'
                    onClick={() => navigate("/")}
                    contentEditable={
                        isEditingTitle
                    }
                >
                    {title?.title}
                </h1>
                <p
                    className='subTitle'
                    contentEditable={
                        isEditingTitle
                    }
                >
                    {title?.subtitle}
                </p>
                <div className='editWebsiteBtn'>
                    {loggedIn &&
                        !isEditingTitle && (
                            <RiEdit2Fill
                                size={20}
                                onClick={
                                    handleEditTitle
                                }
                            />
                        )}
                    {loggedIn && isEditingTitle && (
                        <>
                            <AiFillSave
                                size={20}
                                onClick={
                                    handleSaveTitle
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
            </div>
            {/* {location.pathname === "/" && (
                <BsFilter
                    size={30}
                    className='filter'
                />
            )} */}
            <hr />
        </HeaderStyled>
    );
}

const HeaderStyled = styled.header``;
