import React from "react";
import styled from "styled-components";

export default function BasicModal({ children }) {
    return (
        <BasicModalStyled>
            {children}
        </BasicModalStyled>
    );
}

const BasicModalStyled = styled.div`
    position: fixed;
    width: 100%;
    max-width: 400px;
    height: 100%;
    max-height: 400px;
    z-index: 1;
    background: white;
    top: 50%;
    left: 50%;
    border: 1px solid black;
    translate: -50% -50%;
`;
