import React, {
    Suspense,
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
const DeleteStoryPrompt = React.lazy(() =>
    import(
        "../../components/modals/DeleteStoryPrompt"
    )
);

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
    const [showDelPrompt, setShowDelPrompt] =
        useState(false);
    const handleDelPrompt = () => {
        setShowDelPrompt(true);
    };
    const handleCancelDel = () => {
        setShowDelPrompt(false);
    };
    const handleEditMode = () => {
        dispatch(setIsEditing(!isEditing));
    };

    if (stories.length === 0) {
        return <LoadingSpinner />;
    }

    if (story) {
        if (
            story.meta.status === "draft" &&
            !loggedIn
        ) {
            return <PageNotFound />;
        }
        return (
            <StoryStyled className='storyPage'>
                <Suspense>
                    {showDelPrompt ? (
                        <DeleteStoryPrompt
                            story={story}
                            cancel={
                                handleCancelDel
                            }
                        />
                    ) : null}
                </Suspense>
                {loggedIn && (
                    <>
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
                        <button
                            className='delBtn'
                            onClick={
                                handleDelPrompt
                            }
                        >
                            Delete
                        </button>
                    </>
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
