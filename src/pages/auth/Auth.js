import React from "react";
import styled from "styled-components";
import "./auth.scss";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../../firebase-setup.js";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const nav = useNavigate();
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
                nav("/");
            })
            .catch((err) => {
                console.error(err.message);
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
