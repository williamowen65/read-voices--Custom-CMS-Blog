import {
    collection,
    doc,
    onSnapshot,
} from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../firebase-setup";
import { setWebsite } from "../redux/appReducer";

export default function useWebsiteCol() {
    const dispatch = useDispatch();
    // const docRef = doc(db, "website", section);
    try {
        const webRef = collection(db, "website");
        onSnapshot(webRef, (snapshot) => {
            const newData = [];
            snapshot.docs.forEach((section) => {
                newData.push({
                    ...section.data(),
                    id: section.id,
                });
            });
            // console.log(newData, dispatch);
            // setWebsite(newData);
            dispatch(setWebsite(newData));
        });
    } catch (error) {}
    return;
}
