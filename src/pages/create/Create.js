import React, {
    useEffect,
    useState,
} from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "../404/PageNotFound";
import "./create.scss";
import { CgClose } from "react-icons/cg";
import {
    serverTimestamp,
    addDoc,
} from "firebase/firestore";
import { colRef } from "../../firebase-setup";

function* genIdFn() {
    let count = 0;
    while (true) {
        count++;
        yield Math.random() * 100 * 5000;
    }
}
const genId = genIdFn();
const isValidUrl = (urlString) => {
    try {
        return Boolean(new URL(urlString));
    } catch (e) {
        return false;
    }
};
const slugify = (str) => {
    if (str.indexOf(" ") == -1) {
        return str;
    }
    return str.replaceAll(" ", "-").toLowerCase();
};

export default function Create() {
    const dispatch = useDispatch();
    const { loggedIn } = useSelector(
        (state) => state.app
    );
    const navigate = useNavigate();
    const [isOffline, setIsOffline] =
        useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] =
        useState();

    const [buttons, setButtons] = useState([]);
    const [submitted, setSubmitted] =
        useState(false);

    if (!loggedIn) {
        return <PageNotFound />;
    }

    const setTitleAndDescription = () => {
        const description =
            document.querySelector(
                `#summernote`
            ).value;
        const title =
            document.querySelector(
                `#title`
            ).value;
        setDescription(description);
        setTitle(title);
        return {
            description,
            title,
        };
    };

    const handleDelBtn = (id) => {
        setButtons(
            buttons.filter((el) => el.id !== id)
        );
    };

    const handleSave = (status) => {
        const form = document.querySelector(
            "form.create"
        );

        const title = form.title.value;
        const date = form.date.value;
        const description =
            form.description.value;

        const doc = {
            title,
            description,
            meta: {
                createdAt: serverTimestamp(),
                publishedAt: date
                    ? serverTimestamp().fromDate(
                          new Date(date)
                      )
                    : status === "public"
                    ? serverTimestamp()
                    : null,
                buttons: buttons.map((btn) => {
                    delete btn.id;
                    return btn;
                }),
                status,
                slug: slugify(title),
            },
        };

        addDoc(colRef, doc)
            .then((res) => {
                console.log("success");
            })
            .catch((err) => {
                console.error(err);
            });

        console.log(doc, colRef);
    };

    return (
        <form
            className='storyStyle create'
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                placeholder='Title'
                autoComplete='off'
                type='text'
                name='title'
                id='title'
            />
            <input
                placeholder='Publish date'
                autoComplete='off'
                type='date'
                id='date'
                name='date'
            />
            <textarea
                className='summernote'
                placeholder='Description'
                id='summernote'
                name='description'
            ></textarea>
            <div>
                <header>Add Links</header>
                <div className='links'>
                    <div className='addLinkContainer'>
                        <input
                            type='text'
                            name='text'
                            id='text'
                            placeholder='Label'
                        />
                        <input
                            type='text'
                            name='link'
                            id='link'
                            placeholder='Link to story'
                            autoComplete='off'
                            onClick={(e) => {
                                e.target.value =
                                    "https://www.";
                            }}
                        />
                    </div>
                    <button
                        className='add'
                        onClick={(e) => {
                            const text =
                                document.querySelector(
                                    "input#text"
                                ).value;
                            const link =
                                document.querySelector(
                                    "input#link"
                                ).value;

                            if (
                                isValidUrl(
                                    link
                                ) &&
                                text
                            ) {
                                setTitleAndDescription();
                                setButtons([
                                    ...buttons,
                                    {
                                        text,
                                        link,
                                        id: genId.next()
                                            .value,
                                    },
                                ]);
                                document.querySelector(
                                    "input#text"
                                ).value = "";
                                document.querySelector(
                                    "input#link"
                                ).value =
                                    "https://www.";
                            } else {
                                console.log(
                                    "That is not a real link to"
                                );
                            }
                            // }
                        }}
                    >
                        <div>+</div>
                    </button>
                    <div className='newButtons'>
                        {buttons.map((e, i) => (
                            <div
                                className='btnContainer'
                                key={e.id}
                                data-id={e.id}
                            >
                                <CgClose
                                    className='delBtn'
                                    onClick={() =>
                                        handleDelBtn(
                                            e.id
                                        )
                                    }
                                />
                                <button>
                                    <a
                                        href={
                                            e.link
                                        }
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {e.text}
                                    </a>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={() =>
                    handleSave("public")
                }
                // const { title, description } =
                //     setTitleAndDescription();

                // if (
                //     title &&
                //     description &&
                //     buttons.length
                // ) {
                //     // dispatch(
                //     console.log(
                //         title,
                //         description,
                //         buttons
                //     );
                //     setNewStoryAndStatus(
                //         {
                //             title,
                //             description,
                //             meta: {
                //                 datePublished:
                //                     new Date()
                //                         .toDateString()
                //                         .slice(
                //                             4
                //                         ),
                //                 status: "public",
                //                 buttons,
                //                 slug: slugify(
                //                     title
                //                 ),
                //             },
                //         }
                //     )
                // );
                // navigate("/");
                // } else {
                // dispatch(
                //     setVerboseLog({
                //         title: "must have title, description, and at least one button to publish",
                //     })
                // );
                // }
                // }
            >
                Publish
            </button>
            <button
                onClick={() => {
                    handleSave("draft");
                    // const {
                    //     title,
                    //     description,
                    // } =
                    // setTitleAndDescription();

                    // if (title) {
                    // dispatch(
                    //     setNewStoryAndStatus({
                    //         title,
                    //         description,
                    //         meta: {
                    //             datePublished:
                    //                 null,
                    //             status: "draft",
                    //             buttons,
                    //             slug: slugify(
                    //                 title
                    //             ),
                    //         },
                    //     })
                    // );
                    // navigate("/");
                    // } else {
                    // dispatch(
                    //     setVerboseLog({
                    //         title: "must have title to save as draft",
                    //     })
                    // );
                    // }
                }}
            >
                Save as Draft
            </button>
        </form>
    );
}
// const CreateStyled = styled.div``;
