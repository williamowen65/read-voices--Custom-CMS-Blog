import React from "react";

export function Img({ story }) {
    return (
        <img
            src={
                story.imgUrl
                    ? story.imgUrl
                    : "https://via.placeholder.com/150x227"
            }
            style={{
                width: "150px",
                height: "227px",
            }}
            alt=''
            srcSet=''
        />
    );
}
