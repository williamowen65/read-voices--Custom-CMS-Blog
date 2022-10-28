import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import styled from "styled-components";
import { ContentPadding } from "../../components/SpecialContainers";

export default function Donate() {
    return (
        <DonateStyled className='donate'>
            <ContentPadding classes='contentBox'>
                <h3>Donate Info</h3>
                <p>
                    Some instructions on how
                    people can just send money if
                    they want to... Patreon etc...
                </p>
                <RiEdit2Fill
                    className='editWebsiteBtn'
                    size={20}
                />
            </ContentPadding>
        </DonateStyled>
    );
}

const DonateStyled = styled.div``;
