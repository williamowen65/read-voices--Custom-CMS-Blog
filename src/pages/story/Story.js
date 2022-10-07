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
import LoadingSpinner from "../../components/UX/Spinner";

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

    if (stories.length === 0) {
        return <LoadingSpinner />;
    }

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
                {loggedIn && (
                    <div className='draftBtns'>
                        {isEditing ? (
                            <button
                                onClick={
                                    handleEditMode
                                }
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                onClick={
                                    handleEditMode
                                }
                            >
                                Edit
                            </button>
                        )}
                        {story.meta.status ===
                        "draft" ? (
                            <button>
                                Publish
                            </button>
                        ) : (
                            <button>
                                Re-Publish
                            </button>
                        )}
                    </div>
                )}

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
