import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';

import { onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseAuth from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom';



export default function Login() {
    const navigate =  useNavigate()
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
                await signInWithEmailAndPassword(firebaseAuth, email, password);
            }
            catch(err){
                console.log(err)
            }
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });

    return (
        <Container>
           <BackgroundImage />
            <div className="contain">
                <Header />
              <div className="form-cointaner flex column a-center j-center">
                      <div className="form">
                            <h2>Log In</h2>
                            <input type='email'
                            required
                            placeholder='Email Address'
                            name='email'
                            onChange={changHandler}
                            value={formValue.email}
                             />
                        
                            <input type='password'
                                required
                                placeholder='Password'
                                name='password'
                                onChange={changHandler}
                                value={formValue.password} />
                        
                        <button onClick={submitHandler}>
                                Log in
                            </button>

                        <div>
                            <input type='checkbox'
                            id='checkbox'
                            />
                            <label htmlFor='checkbox'>Remember me</label>
                        </div>
                      </div>
                     
              </div>
            </div>
        </Container>
    )
}
const Container = styled.div`
    position: relative;
    .form-cointaner{
      width: 30%;
      border-radius: 6px;
      height: 450px;
      margin: auto;
      
      background-color: #000000b0;
     
    }
    .form{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
      width: 100%;
      padding: 2rem;
      h2{
        font-size: 2rem;
        padding: 10px;
        line-height: 2rem;
        margin-top: 15px;
      }
      input{
        border-radius: 5px;
        border: none;
        background-color: #403c3c;
        margin-inline: 13px;
        padding: 13px;
      }
      button {
        margin-top: 20px;
        margin-inline: 13px;
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
                .h1{
                    padding: 0 25rem;
                }
            }
            .form{
              display: flex;
              flex-direction: column;
              gap: 1rem;
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
