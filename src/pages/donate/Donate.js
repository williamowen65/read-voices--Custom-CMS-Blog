import React from "react";
import styled from "styled-components";

export default function Donate() {
    return (
        <DonateStyled>
            <h3>Donate Info</h3>
            <p>
                Some instructions on how people
                can just send money if they want
                to... Patreon etc...
            </p>
        </DonateStyled>
    );
}

const DonateStyled = styled.div``;
