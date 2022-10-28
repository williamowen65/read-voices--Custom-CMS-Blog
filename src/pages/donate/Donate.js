import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ContentPadding } from "../../components/SpecialContainers";

export default function Donate() {
    const { website } = useSelector(
        (state) => state.app
    );
    const donate = website.filter(
        (el) => el.id === "donate"
    )[0];
    return (
        <DonateStyled className='donate'>
            <ContentPadding classes='contentBox'>
                <h2>{donate?.title}</h2>
                <div
                    className='content'
                    dangerouslySetInnerHTML={{
                        __html: donate?.html,
                    }}
                ></div>
                <RiEdit2Fill
                    className='editWebsiteBtn'
                    size={20}
                />
            </ContentPadding>
        </DonateStyled>
    );
}

const DonateStyled = styled.div``;
