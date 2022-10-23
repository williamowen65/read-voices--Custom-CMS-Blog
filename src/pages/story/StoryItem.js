import { logEvent } from "firebase/analytics";
import React, { useRef } from "react";
import { BiShareAlt } from "react-icons/bi";
import styled from "styled-components";
import { ContentPadding } from "../../components/SpecialContainers";
import { analytics } from "../../firebase-setup";

export default function StoryItem({ story }) {
    const shareBtn = useRef();
    const handleButtonClick = (text, url) => {
        window.open(url, "_blank");
        logEvent(analytics, "select_content", {
            event_name: "outbound_link",
            content: story.title,
            to: text,
        });
    };
    return (
        <li>
            <ContentPadding>
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
                    <img
                        src='https://via.placeholder.com/150x227'
                        alt=''
                        srcset=''
                    />
                    <div className='floatBox'>
                        <header className='story'>
                            <h2>{story.title}</h2>
                            <p>
                                {story.meta.publishedAt?.slice(
                                    3
                                )}
                            </p>
                        </header>
                        {/* <span> */}
                        <p>{story.description}</p>
                    </div>
                    {/* </span> */}
                </div>
                <div className='buttons'>
                    {story.buttons?.length ? (
                        story.buttons.map(
                            (el, i) => (
                                <button
                                    className='storyBtn'
                                    onClick={() =>
                                        handleButtonClick(
                                            el.text,
                                            el.link
                                        )
                                    }
                                    key={el.id}
                                >
                                    {el.text}
                                </button>
                            )
                        )
                    ) : (
                        <button>
                            No Links shared
                        </button>
                    )}
                </div>
            </ContentPadding>
        </li>
    );
}
