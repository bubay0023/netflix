import React from 'react';
import styled from 'styled-components';
import {BsArrowLeft} from 'react-icons/bs';
import Video from '../assets/video.mp4';
import { useNavigate } from "react-router-dom";;





export default function Player() {
    const navigate = useNavigate()
  return (
    <Container>
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={()=> navigate(-1)}/>
                </div>
                <video src={Video} autoPlay loop controls muted />
            </div>
    </Container>
  )
}



const Container = styled.div`
    .player{
        height: 100vh;
        width: 100vw;
        .back{
            position: absolute;
            padding: 2rem;
            z-index: 1;
            svg{
                font: 3rem;
                cursor: pointer;

            }
        }
        video{
            height: 100%;
            width: 100%;
            object-fit: cover;
            
        }
    }
`;