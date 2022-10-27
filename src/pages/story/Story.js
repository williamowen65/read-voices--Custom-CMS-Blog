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
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "../404/PageNotFound";
import "./story.scss";
import StoryItem from "./StoryItem";
import {
    setActiveSlug,
    setIsEditing,
} from "../../redux/appReducer";
import LoadingSpinner from "../../components/UX/Spinner";
import {
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-setup";
import { FormTemplate } from "../create/FormTemplate";
import { slugify } from "../../utilFns/slugify";
import { setImgUrlForStory } from "../../redux/storyReducer";
import useEditDispatches from "../../hooks/useEditDispatches";
import useUploadImg from "../../hooks/useUploadImg";
import useUploadDoc from "../../hooks/useUploadDoc";
const DeleteStoryPrompt = React.lazy(() =>
    import(
        "../../components/modals/DeleteStoryPrompt"
    )
);

export default function Story() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { triggerDispatches } =
        useEditDispatches();
    const { slug } = useParams();
    const { stories, newImg } = useSelector(
        (state) => state.stories
    );

    const { loggedIn, isEditing } = useSelector(
        (state) => state.app
    );
    const story = stories.filter(
        (story) => story.slug === slug
    )[0];
    useEffect(() => {
        dispatch(setActiveSlug(slug));
    }, [slug]);
    const [showDelPrompt, setShowDelPrompt] =
        useState(false);
    const handleDelPrompt = () => {
        setShowDelPrompt(true);
    };
    const handleCancelDel = () => {
        setShowDelPrompt(false);
    };
    const handleEditMode = () => {
        triggerDispatches();
    };
    const { handleFileUpload, progress } =
        useUploadImg({ story });

    const { handleUpdate } = useUploadDoc(
        "update",
        {
            story,
        }
    );

    const handleSave = (status) => {
        if (isEditing) {
            handleFileUpload();
        }
        handleUpdate(status);
    };

    if (stories.length === 0) {
        return <LoadingSpinner />;
    }

    if (story) {
        if (
            story.status === "draft" &&
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
                            {story.status ===
                            "draft" ? (
                                <>
                                    <button
                                        onClick={() =>
                                            handleSave(
                                                "public"
                                            )
                                        }
                                    >
                                        Publish
                                    </button>
                                    {isEditing && (
                                        <button
                                            onClick={() =>
                                                handleSave(
                                                    "draft"
                                                )
                                            }
                                        >
                                            Save
                                            Draft
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    {isEditing && (
                                        <button
                                            onClick={() => {
                                                handleSave(
                                                    "public"
                                                );
                                            }}
                                        >
                                            Save
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            handleSave(
                                                "draft"
                                            )
                                        }
                                    >
                                        Revert to
                                        Draft
                                    </button>
                                </>
                            )}
                        </div>
                        <button
                            className='delDocBtn'
                            onClick={
                                handleDelPrompt
                            }
                        >
                            Delete
                        </button>
                    </>
                )}

                <ul>
                    {isEditing ? (
                        <FormTemplate
                            story={story}
                        />
                    ) : (
                        <StoryItem
                            story={story}
                        />
                    )}
                </ul>
            </StoryStyled>
        );
    } else {
        return null;
    }
}

const StoryStyled = styled.div``;
