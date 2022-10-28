import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ContentPadding } from "../../components/SpecialContainers";
import "./about.scss";

export default function About() {
    const { website } = useSelector(
        (state) => state.app
    );
    const about = website.filter(
        (el) => el.id === "about"
    )[0];
    return (
        <AboutStyled id='about'>
            <ContentPadding classes='contentBox'>
                <h2>{about?.title}</h2>
                <div
                    className='content'
                    dangerouslySetInnerHTML={{
                        __html: about?.html,
                    }}
                ></div>
                <RiEdit2Fill
                    className='editWebsiteBtn'
                    size={20}
                />
            </ContentPadding>
        </AboutStyled>
    );
}

const AboutStyled = styled.div``;
