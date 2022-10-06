import React from "react";
import { BiShareAlt } from "react-icons/bi";
import styled from "styled-components";

export default function StoryItem({ story }) {
    return (
        <li>
            <div className='share'>
                <span className='copyNote'>
                    Link Copied to Clipboard!
                </span>
                <BiShareAlt
                    size={20}
                    onClick={() => {
                        navigator.clipboard.writeText(
                            window.location
                                .origin +
                                "/story/" +
                                story.meta.slug
                        );
                        document
                            .querySelector(
                                ".share"
                            )
                            .classList.toggle(
                                "active"
                            );
                        setTimeout(() => {
                            document
                                .querySelector(
                                    ".share"
                                )
                                .classList.toggle(
                                    "active"
                                );
                        }, 3000);
                    }}
                />
            </div>
            <div className='item'>
                <header className='story'>
                    <h2>{story.title}</h2>
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
                {story.meta?.buttons?.length ? (
                    story.meta.buttons.map(
                        (el, i) => (
                            <button key={i}>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href={el.link}
                                >
                                    {el.text}
                                </a>
                            </button>
                        )
                    )
                ) : (
                    <button>
                        No Links shared
                    </button>
                )}
            </div>
        </li>
    );
}
