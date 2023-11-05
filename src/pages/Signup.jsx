import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { Button } from 'style-components';
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import firebaseAuth from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom';



export default function Signup() { 
    const login = true;
    const navigate =  useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [formValue, setFormValue] = useState({
        email:"",
        password:"",
    })
    
    function changHandler(event){
        setFormValue( (prev)=> ({
            ...prev,[event.target.name]:event.target.value
        }))
    }

    async function submitHandler(){
            try{
                const {email,password} = formValue;
                await createUserWithEmailAndPassword(firebaseAuth, email, password);
            }
            catch(err){
                console.log(err)
            }
    }

    onAuthStateChanged( firebaseAuth,(currentUser) => {
        if(currentUser) navigate("/");
    })

    return (
        <Container>
            <BackgroundImage />
            <div className="contain">
                <Header login={login} />
                <div className='body flex column a-center j-center'>
                    <div className="text flex column">
                        <h1>
                            Unlimited Movies, TV show and more
                        </h1>
                        <h4>
                            watch anywhere. Cancel anytime.
                        </h4>
                        <h6>
                            Ready to watch. Enter your email to create or restart membership
                        </h6>
                    </div>
                    <div className="form">
                        <input type='email'
                            required
                            placeholder='Email Address'
                            name='email'
                            onChange={changHandler}
                            value={formValue.email}
                             />
                        {
                            showPassword &&
                            <input type='password'
                                required
                                placeholder='Password'
                                name='password'
                                onChange={changHandler}
                                value={formValue.password} />
                        }
                        {
                            !showPassword &&
                            <button
                                onClick={() => setShowPassword(true)}>
                                Get Started
                            </button>
                        }

                    </div>
                    {
                        showPassword && 
                        <Button onClick={submitHandler} >Sign up</Button>
                    }
                    
                </div>
            </div>

        </Container>
    )
}
const Container = styled.div`
    position: relative;

    .contain{
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-rows: 15vh 85vh; 
        .body{
            gap:1rem;
            .text{
                text-align: center;
                font-size: 2rem;
                
                
                h4{
                    margin: auto;
                }
                h6{
                    margin: auto;
                }
            }
            .form{
                gap: 1rem;
                display: grid;
                grid-template-columns: ${({ showPassword }) =>
                        showPassword ? "1fr 1fr" : "2fr 1fr"};
                width:60%;
                input{
                    color: black;
                    border: none;
                    padding: 1.5rem;
                    font-size: 1.2rem;
                    border: 1px solid black;
                    &:focus{
                        outline: none;
                    }
                }
                button {
                    padding: 0.5rem 1rem;
                    background-color: #e50914;
                    border: none;
                    cursor: pointer;
                    color: white;
                    font-weight: bolder;
                    font-size: 1.05rem;
                    border-radius: 0.2rem;
                }
            }
            button {
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                border-radius: 0.2rem;
                font-weight: bolder;
                font-size: 1.05rem;
            }
        }
    }

`;