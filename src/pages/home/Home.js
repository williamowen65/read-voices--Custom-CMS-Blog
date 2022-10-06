import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingSpinner from "../../components/UX/Spinner";
import "./styles/home.scss";

export default function Home() {
    const { stories } = useSelector(
        (state) => state.stories
    );

    if (stories.length === 0) {
        return <LoadingSpinner />;
    }

    return (
        <HomeStyled>
            <ul>
                {stories
                    .filter(
                        (story) =>
                            story.meta.status ===
                            "public"
                    )
                    .map((story) => (
                        <li key={story.id}>
                            <div className='item'>
                                <header className='story'>
                                    <h2>
                                        {
                                            story.title
                                        }
                                    </h2>
                                    <br></br>
                                    <p>
                                        {story.meta.publishedAt.slice(
                                            3
                                        )}
                                    </p>
                                </header>
                                {/* <span> */}
                                {
                                    story.description
                                }
                                {/* </span> */}
                                {/* <hr /> */}
                            </div>
                        </li>
                    ))}
            </ul>
        </HomeStyled>
    );
}

const HomeStyled = styled.div``;
