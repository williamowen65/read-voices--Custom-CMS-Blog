import React, { Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingSpinner from "../../components/UX/Spinner";
import "./styles/home.scss";
import { BsFilter } from "react-icons/bs";

import {
    BiShare,
    BiShareAlt,
} from "react-icons/bi";
import StoryItem from "../story/StoryItem";

export default function Home() {
    const { stories } = useSelector(
        (state) => state.stories
    );

    if (stories.length === 0) {
        return <LoadingSpinner />;
    }

    return (
        <HomeStyled className='home'>
            <ul>
                {stories
                    .filter(
                        (story) =>
                            story.status ===
                            "public"
                    )
                    .map((story) => (
                        <Fragment key={story.id}>
                            <StoryItem
                                story={story}
                            />
                            <hr />
                        </Fragment>
                    ))}
            </ul>
        </HomeStyled>
    );
}

const HomeStyled = styled.div``;
