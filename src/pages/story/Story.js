import React from "react";
import { BiShareAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "../404/PageNotFound";
import "./story.scss";
import StoryItem from "./StoryItem";

export default function Story() {
    const { slug } = useParams();
    const { stories } = useSelector(
        (state) => state.stories
    );
    const { loggedIn } = useSelector(
        (state) => state.app
    );
    const story = stories.filter(
        (story) => story.meta.slug === slug
    )[0];
    console.log(story);

    if (story) {
        if (
            story.meta.status === "draft" &&
            !loggedIn
        ) {
            return <PageNotFound />;
        }
        return (
            <StoryStyled className='storyPage'>
                {story.meta.status ===
                    "draft" && (
                    <div className='draftBtns'>
                        <button>Edit</button>
                        <button>Publish</button>
                    </div>
                )}
                {story.meta.status ===
                    "public" && (
                    <div className='draftBtns'>
                        <button>Edit</button>
                        <button>
                            Re-Publish
                        </button>
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
