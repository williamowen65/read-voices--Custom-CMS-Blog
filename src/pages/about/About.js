import React from "react";
import styled from "styled-components";
import { ContentPadding } from "../../components/SpecialContainers";
import "./about.scss";

export default function About() {
    return (
        <AboutStyled id='about'>
            <ContentPadding>
                <h2>About Page</h2>
                <p>
                    Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit.
                    Illo neque optio alias ipsa
                    nemo architecto, rerum harum
                    quasi quo commodi. Ratione
                    optio natus non eum obcaecati
                    laborum illo accusamus
                    doloribus minima corrupti
                    placeat, aut et aperiam
                    dignissimos doloremque
                    voluptas nemo. Nulla ullam eum
                    excepturi distinctio vitae
                    sapiente? Id, voluptatibus
                    aperiam.
                </p>
            </ContentPadding>
        </AboutStyled>
    );
}

const AboutStyled = styled.div``;
