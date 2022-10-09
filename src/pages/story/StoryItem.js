import React, { useRef } from "react";
import { BiShareAlt } from "react-icons/bi";
import styled from "styled-components";

export default function StoryItem({ story }) {
    const shareBtn = useRef();
    return (
        <li>
            <div
                className='shareContainer'
                ref={shareBtn}
            >
                <span className='copyNote'>
                    Link Copied to Clipboard!
                </span>
                <BiShareAlt
                    size={20}
                    className='share'
                    onClick={() => {
                        navigator.clipboard.writeText(
                            window.location
                                .origin +
                                "/story/" +
                                story.slug
                        );
                        shareBtn.current.classList.toggle(
                            "active"
                        );
                        setTimeout(() => {
                            shareBtn.current.classList.toggle(
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
                {story.buttons?.length ? (
                    story.buttons.map((el, i) => (
                        <button className='storyBtn'>
                            <a
                                target='_blank'
                                rel='noreferrer'
                                href={el.link}
                                key={i}
                            >
                                {el.text}
                            </a>
                        </button>
                    ))
                ) : (
                    <button>
                        No Links shared
                    </button>
                )}
            </div>
        </li>
    );
}
