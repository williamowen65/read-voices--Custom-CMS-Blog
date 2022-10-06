import React from "react";
import styled from "styled-components";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../../firebase-setup.js";

export default function Auth() {
    const handleLogin = (e) => {
        e.preventDefault();
        const loginForm = e.target;

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        signInWithEmailAndPassword(
            auth,
            email,
            password
        )
            .then((cred) => {
                loginForm.reset();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <AuthStyled>
            <form
                className='login'
                onSubmit={handleLogin}
            >
                <label htmlFor='email'>
                    email
                </label>
                <input type='text' name='email' />
                <label htmlFor='password'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                />
                <button>Submit</button>
            </form>
        </AuthStyled>
    );
}

const AuthStyled = styled.div``;
