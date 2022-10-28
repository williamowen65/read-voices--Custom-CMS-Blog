import React from "react";

export function Img({ story }) {
    return (
        <img
            src={
                story.imgUrl
                    ? story.imgUrl
                    : "https://via.placeholder.com/150x227"
            }
            alt=''
            srcSet=''
        />
    );
}
