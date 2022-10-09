import React from "react";
import styled from "styled-components";

export function ContentPadding({ children }) {
    return (
        <ContentPaddingStyled>
            {children}
        </ContentPaddingStyled>
    );
}

const ContentPaddingStyled = styled.div`
    padding: 0 5px;
`;
