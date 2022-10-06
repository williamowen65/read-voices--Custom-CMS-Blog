import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase-setup";
import { setLoggedIn } from "../../redux/appReducer";

export default function AuthStateChange(props) {
    const dispatch = useDispatch();
    onAuthStateChanged(auth, (user) => {
        console.log(
            "auth status changed: ",
            user
        );
        if (user) {
            dispatch(setLoggedIn(true));
        } else {
            dispatch(setLoggedIn(false));
        }
    });
    return <></>;
}
