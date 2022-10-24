import React, { useEffect } from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { setIsEditing } from "../redux/appReducer";
import { setImgUrlForStory } from "../redux/storyReducer";

export default function useEditDispatches(props) {
    const { isEditing } = useSelector(
        (state) => state.app
    );
    const dispatch = useDispatch();

    function triggerDispatches() {
        if (isEditing) {
            dispatch(setImgUrlForStory(null));
        }
        dispatch(setIsEditing(!isEditing));
    }

    return { isEditing, triggerDispatches };
}
