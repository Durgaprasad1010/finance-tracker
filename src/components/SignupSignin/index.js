import React, { useState } from 'react'
import './styles.css'
import Input from '../Input'
import Button from '../Button'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'

function SignupSigninComponent() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const [loading, setLoading] = useState(false)


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

    return (
        <div className='signup-wrapper'>
            <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span></h2>
            <form>
                <Input type="text" label={"Full Name"} state={name} setState={setName} placeholder="John Doe" />

                <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder="Johndoe@gmail.com" />

                <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder="Johndoe@123" />
                <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setconfirmPassword} placeholder="Johndoe@123" />

                <Button disabled={loading} text={loading ? "Loading..." : "Signup Using Email and Password"} onClick={signupWithEmail} />

                <p style={{ margin: 0, textAlign: "center" }}>or</p>

                <Button text={loading ? "Loading..." : "Signup Using Google"} blue={true} />
            </form>
        </div>
    )
}

export default SignupSigninComponent