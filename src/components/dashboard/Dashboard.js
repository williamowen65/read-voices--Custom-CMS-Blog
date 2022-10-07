import React, { useEffect } from "react";
import styled from "styled-components";
import "./dashboard.scss";
import { TbPlus } from "react-icons/tb";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import { setIsEditing } from "../../redux/appReducer";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { stories } = useSelector(
        (state) => state.stories
    );

    const navigate = useNavigate();
    const { activeSlug } = useSelector(
        (state) => state.app
    );

    // // const { slug } = useParams();
    useEffect(() => {
        console.log(activeSlug);
    }, []);

    return (
        <DashboardStyled id='dashboard'>
            <header>
                <h3>Dashboard</h3>

                <TbPlus
                    size={30}
                    className='add'
                    onClick={() => {
                        navigate("/create");
                    }}
                />
            </header>
            <ul className='dash'>
                {stories.map((el, i) => (
                    <LiStyled
                        key={el.id}
                        data-id={el.id}
                        data-slug={el.slug}
                        status={el.status}
                        onClick={() => {
                            navigate(
                                `/story/${el.slug}`
                            );
                            dispatch(
                                setIsEditing(
                                    false
                                )
                            );
                        }}
                        className={
                            activeSlug === el.slug
                                ? "active"
                                : null
                        }
                    >
                        <h4 className='title'>
                            {el.title}
                        </h4>

                        <div
                            className='statusContainer'
                            // onClick={(e) =>
                            // handleStatusClick(
                            //     e,
                            //     el,
                            //     el.id
                            // )
                            // }
                        >
                            <p>{el.status}</p>
                            {/* <Dot story={el} /> */}
                        </div>
                    </LiStyled>
                ))}
            </ul>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div``;

const LiStyled = styled.li`
    background-color: ${({ status }) => {
        switch (status) {
            case "public":
                return "lightblue";
            case "private":
                return "white";
            case "draft":
                return "green";

            default:
                break;
        }
    }};
`;
