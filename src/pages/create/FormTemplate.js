import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import React, {
    useEffect,
    useState,
} from "react";
import {
    CgClose,
    CgMathPlus,
} from "react-icons/cg";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useLocation } from "react-router-dom";
import { storage } from "../../firebase-setup";
import {
    setButtonsForStory,
    setTitleAndDescriptionForStory,
    setImgUrlForStory,
} from "../../redux/storyReducer";
import { slugify } from "../../utilFns/slugify";
const isValidUrl = (urlString) => {
    try {
        return Boolean(new URL(urlString));
    } catch (e) {
        return false;
    }
};
function* genIdFn() {
    while (true) {
        yield Math.random() * 100 * 5000;
    }
}
const genId = genIdFn();

export function FormTemplate({
    handleSave,
    story,
    helpers,
}) {
    const dispatch = useDispatch();
    const [buttons, setButtons] = useState([]);
    // console.log("editing: ", story);
    const location = useLocation();
    const { isEditing } = useSelector(
        (state) => state.app
    );
    const [progress, setProgress] = useState(0);
    const { newImgUrl } = useSelector(
        (state) => state.stories
    );
    // const [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {
        if (story) {
            document.querySelector(
                `#summernote`
            ).value = story.description;

            document.querySelector(
                `#title`
            ).value = story.title;
            setButtons(story.buttons);

            document.querySelector(
                "#date"
            ).valueAsDate = new Date(
                story.meta.publishedAt
            );
        }
    }, []);

    const setTitleAndDescription = () => {
        const description =
            document.querySelector(
                `#summernote`
            ).value;
        const title =
            document.querySelector(
                `#title`
            ).value;

        if (story) {
            dispatch(
                setTitleAndDescriptionForStory(
                    story.slug,
                    {
                        title,
                        description,
                        slug: slugify(title),
                    }
                )
            );
        }

        return {
            description,
            title,
        };
    };

    const handleDelBtn = (text, link) => {
        if (story) {
            // alert("hi");
            dispatch(
                setButtonsForStory({
                    slug: story.slug,
                    buttons: buttons.filter(
                        (el) => {
                            return (
                                el.text !==
                                    text &&
                                el.link !== link
                            );
                        }
                    ),
                })
            );
        }
        console.log(story);
        setButtons(
            buttons.filter((el) => {
                return (
                    el.text !== text &&
                    el.link !== link
                );
            })
        );
    };

    const handleAddBtn = () => {
        const text =
            document.querySelector(
                "input#text"
            ).value;
        const link =
            document.querySelector(
                "input#link"
            ).value;

        if (isValidUrl(link) && text) {
            setTitleAndDescription();
            if (story) {
                // alert("hi");
                dispatch(
                    setButtonsForStory({
                        slug: story.slug,
                        buttons: [
                            ...buttons,
                            {
                                text,
                                link,
                            },
                        ],
                    })
                );
            }
            setButtons([
                ...buttons,
                {
                    text,
                    link,
                    id: genId.next().value,
                },
            ]);

            document.querySelector(
                "input#text"
            ).value = "";
            document.querySelector(
                "input#link"
            ).value = "https://www.";
        } else {
            console.error(
                "That is not a real link to anything"
            );
        }
        // }
    };

    const handleImagePrompt = () => {
        document
            .getElementById("fileDialogId")
            .click();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const storageRef = ref(
            storage,
            `/files/${file.name}`
        );
        const uploadTask = uploadBytesResumable(
            storageRef,
            file
        );
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred /
                        snapshot.totalBytes) *
                        100
                );
                setProgress(progress);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(
                    uploadTask.snapshot.ref
                ).then((url) => {
                    dispatch(
                        setImgUrlForStory(url)
                    );
                    // setNewImgUrl(url);
                });
            }
        );
    };

    return (
        <>
            <form style={{ display: "none" }}>
                <input
                    type='file'
                    id='fileDialogId'
                    accept='.png, .jpg, .jpeg'
                    onChange={handleFileUpload}
                />
            </form>
            <form
                className='storyStyle create'
                onSubmit={(e) =>
                    e.preventDefault()
                }
            >
                <div
                    className={
                        "imgContainer " +
                        (isEditing
                            ? "isEditing "
                            : "")
                    }
                    onClick={() => {
                        if (isEditing) {
                            handleImagePrompt();
                        }
                    }}
                >
                    <img
                        src={
                            newImgUrl
                                ? newImgUrl
                                : story.imgUrl
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
                    {isEditing && (
                        <CgMathPlus
                            size={55}
                            className='plus'
                        />
                    )}
                    <h3>Uploaded {progress}%</h3>
                </div>
                <div>
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
                                    onFocus={(
                                        e
                                    ) => {
                                        e.target.value =
                                            "https://www.";
                                    }}
                                />
                            </div>
                            <button
                                className='add'
                                onClick={
                                    handleAddBtn
                                }
                            >
                                <div>+</div>
                            </button>
                            <div className='newButtons'>
                                {buttons.map(
                                    (e, i) => {
                                        let key =
                                            i +
                                            Math.random() *
                                                Math.random() *
                                                30;
                                        return (
                                            <div
                                                className='btnContainer'
                                                key={
                                                    key
                                                }
                                                data-id={
                                                    e.id
                                                }
                                            >
                                                <CgClose
                                                    className='delBtn'
                                                    onClick={() =>
                                                        handleDelBtn(
                                                            e.text,
                                                            e.link
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
                                                        {
                                                            e.text
                                                        }
                                                    </a>
                                                </button>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    {!location.pathname.includes(
                        "/story/"
                    ) && (
                        <>
                            <button
                                onClick={() =>
                                    handleSave(
                                        "public",
                                        buttons,
                                        story.imgUrl
                                    )
                                }
                            >
                                Publish
                            </button>
                            <button
                                onClick={() => {
                                    handleSave(
                                        "draft",
                                        buttons
                                    );
                                }}
                            >
                                Save as Draft
                            </button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
}
