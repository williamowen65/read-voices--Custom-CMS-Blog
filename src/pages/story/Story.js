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
const DeleteStoryPrompt = React.lazy(() =>
    import(
        "../../components/modals/DeleteStoryPrompt"
    )
);

export default function Story() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { slug } = useParams();
    const { stories } = useSelector(
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
        dispatch(setIsEditing(!isEditing));
    };
    const handleUpdate = (status) => {
        const docRef = doc(
            db,
            "stories",
            story.id
        );
        const title =
            document.querySelector("#title")
                ?.value || story.title;
        const description =
            document.querySelector("#summernote")
                ?.value || story.description;
        const date =
            document.querySelector("#date")
                ?.value || story.meta.publishedAt;

        // console.log("STATEUS: ", status);
        if (status === "public") {
            if (
                !title ||
                !description ||
                !story.buttons.length
            ) {
                alert(
                    "Hey man, You can only publish this if you have a title, description, and at least one button"
                );
                return;
            }
            if (!date) {
                // eslint-disable-next-line no-restricted-globals
                const res = confirm(
                    "You provided no publish date. Do you want to just use today as the date? You can change it later."
                );
                if (!res) {
                    return;
                }
            }
        }

        let docc = {
            status: status,
            title,
            description,
            slug: slugify(title),
            buttons: story.buttons,
            meta: {
                createdAt: Timestamp.fromDate(
                    new Date(story.meta.createdAt)
                ),
                publishedAt: date
                    ? Timestamp.fromDate(
                          new Date(date)
                      )
                    : null,
            },
        };

        if (
            status === "public" &&
            !docc.meta.publishedAt
        ) {
            docc["meta"].publishedAt =
                serverTimestamp();
        }

        console.log(docc);

        updateDoc(docRef, docc)
            .then(() => {
                console.log("success");
                nav(`/story/${docc.slug}`);
                dispatch(setIsEditing(false));
            })
            .catch((err) => {
                console.error(err);
            });
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
                                            handleUpdate(
                                                "public"
                                            )
                                        }
                                    >
                                        Publish
                                    </button>
                                    {isEditing && (
                                        <button
                                            onClick={() =>
                                                handleUpdate(
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
                                                handleUpdate(
                                                    "public"
                                                );
                                            }}
                                        >
                                            Save
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            handleUpdate(
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
