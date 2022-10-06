import React from "react";
import { BiShareAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "../404/PageNotFound";
import "./story.scss";

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
                    <li>
                        <div className='share'>
                            <span className='copyNote'>
                                Link Copied to
                                Clipboard!
                            </span>
                            <BiShareAlt
                                size={20}
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        window
                                            .location
                                            .href +
                                            "story/" +
                                            story
                                                .meta
                                                .slug
                                    );
                                    document
                                        .querySelector(
                                            ".share"
                                        )
                                        .classList.toggle(
                                            "active"
                                        );
                                    setTimeout(
                                        () => {
                                            document
                                                .querySelector(
                                                    ".share"
                                                )
                                                .classList.toggle(
                                                    "active"
                                                );
                                        },
                                        3000
                                    );
                                }}
                            />
                        </div>
                        <div className='item'>
                            <header className='story'>
                                <h2>
                                    {story.title}
                                </h2>
                                <p>
                                    {story.meta.publishedAt?.slice(
                                        3
                                    )}
                                </p>
                            </header>
                            {/* <span> */}
                            {story.description}
                            {/* </span> */}
                        </div>
                        <div className='buttons'>
                            {story.meta?.buttons
                                ?.length ? (
                                story.meta.buttons.map(
                                    (el, i) => (
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
                                    No Links
                                    shared
                                </button>
                            )}
                        </div>
                    </li>
                </ul>
            </StoryStyled>
        );
    } else {
        return null;
    }
}

const StoryStyled = styled.div``;
