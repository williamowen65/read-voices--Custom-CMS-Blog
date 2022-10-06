import React, { Fragment, Suspense } from "react";
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
                        <Fragment key={story.id}>
                            <li>
                                <div className='item'>
                                    <header className='story'>
                                        <h2>
                                            {
                                                story.title
                                            }
                                        </h2>
                                        <p>
                                            {story.meta.publishedAt?.slice(
                                                3
                                            )}
                                        </p>
                                    </header>
                                    {/* <span> */}
                                    {
                                        story.description
                                    }
                                    {/* </span> */}
                                </div>
                                <div className='buttons'>
                                    {story.meta
                                        ?.buttons
                                        ?.length ? (
                                        story.meta.buttons.map(
                                            (
                                                el,
                                                i
                                            ) => (
                                                <button
                                                    key={
                                                        i
                                                    }
                                                >
                                                    <a
                                                        target='_blank'
                                                        rel='noreferrer'
                                                        href={
                                                            el.link
                                                        }
                                                    >
                                                        {
                                                            el.text
                                                        }
                                                    </a>
                                                </button>
                                            )
                                        )
                                    ) : (
                                        <button>
                                            No
                                            Links
                                            shared
                                        </button>
                                    )}
                                </div>
                            </li>
                            <hr />
                        </Fragment>
                    ))}
            </ul>
        </HomeStyled>
    );
}

const HomeStyled = styled.div``;
