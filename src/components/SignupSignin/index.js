import React, { useState } from 'react'
import './styles.css'
import Input from '../Input'
import Button from '../Button'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

function SignupSigninComponent() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [loginForm, setLoginForm] = useState(false)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    function signupWithEmail() {
        setLoading(true)
        console.log("Name", name)
        console.log("email", email)
        console.log("password", password)
        console.log("confirm password", confirmPassword)

        // Authenticate new user or sign in with email

        if (name != "" && email != "" && password != "" && confirmPassword != "") {
            if (password == confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;

                        console.log("User--> ", user)
                        toast.success("User created")
                        setLoading(false)
                        setName("")
                        setEmail("")
                        setPassword("")
                        setconfirmPassword("")
                        createDoc(user)
                        navigate("/dashboard")
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage)

                        setLoading(false)

                        // ..
                    });
            } else {
                toast.error("Password and Confirm password don't match")
                setLoading(false)

            }

        } else {
            toast.error("All fields are mandatory!")
            setLoading(false)
        }
    }

    function loginUsingEmail() {
        console.log("Email", email)
        console.log("Password", password)

        if (email != "" && password != "") {

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    toast.success("User logged In Successfully!")
                    console.log("Logged In user => ", user)
                    navigate("/dashboard")

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(error.message)
                });
        } else {
            toast.error("All fields are mandatory!")
        }



    }



    function createDoc(user) {
        // Make sure that the doc with the uid doesn't exist
        // Create a doc
    }

    return (

        <>
            {loginForm ?
                <div className='signup-wrapper'>
                    <h2 className='title'>Login on <span style={{ color: "var(--theme)" }}>Financely.</span></h2>
                    <form>

                        <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder="Johndoe@gmail.com" />

                        <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder="Johndoe@123" />


                        <Button disabled={loading} text={loading ? "Loading..." : "Login Using Email and Password"} onClick={loginUsingEmail} />

                        <p className='p-login'>or</p>

                        <Button text={loading ? "Loading..." : "Login Using Google"} blue={true} />

                        <p className='p-login'
                            style={{ cursor: "pointer" }}
                            onClick={() => setLoginForm(!loginForm)}
                        >Or Don't Have An Account Already? Click Here</p>

                    </form>
                </div>
                :
                <div className='signup-wrapper'>
                    <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span></h2>
                    <form>
                        <Input type="text" label={"Full Name"} state={name} setState={setName} placeholder="John Doe" />

                        <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder="Johndoe@gmail.com" />

                        <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder="Johndoe@123" />
                        <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setconfirmPassword} placeholder="Johndoe@123" />

                        <Button disabled={loading} text={loading ? "Loading..." : "Signup Using Email and Password"} onClick={signupWithEmail} />

                        <p className='p-login'>or</p>

                        <Button text={loading ? "Loading..." : "Signup Using Google"} blue={true} />

                        <p className='p-login'
                            style={{ cursor: "pointer" }}
                            onClick={() => setLoginForm(!loginForm)}
                        >Or Have An Account Already? Click Here</p>
                    </form>
                </div>}
        </>


    )
}

export default SignupSigninComponent