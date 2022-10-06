import React, {
    useEffect,
    useState,
} from "react";
import { BiShareAlt } from "react-icons/bi";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "../404/PageNotFound";
import "./story.scss";
import StoryItem from "./StoryItem";
import { setIsEditing } from "../../redux/appReducer";

export default function Story() {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const { stories } = useSelector(
        (state) => state.stories
    );
    const { loggedIn, isEditing } = useSelector(
        (state) => state.app
    );
    const story = stories.filter(
        (story) => story.meta.slug === slug
    )[0];

    const handleEditMode = () => {
        dispatch(setIsEditing(!isEditing));
    };

    if (story) {
        if (
            story.meta.status === "draft" &&
            !loggedIn
        ) {
            return <PageNotFound />;
        }
        return (
            <StoryStyled className='storyPage'>
                <div className='draftBtns'>
                    <button
                        onClick={handleEditMode}
                    >
                        {isEditing
                            ? story.meta
                                  .status ===
                              "draft"
                                ? "Publish"
                                : "Re-Publish"
                            : "Edit"}
                    </button>
                </div>

                <ul>
                    <StoryItem story={story} />
                </ul>
            </StoryStyled>
        );
    } else {
        return null;
    }
}

const StoryStyled = styled.div``;
