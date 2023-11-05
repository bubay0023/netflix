import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Video from '../assets/video.mp4';
import {IoPlayCircleSharp} from 'react-icons/io5';
import {RiThumbUpFill, RiThumbDownFill} from 'react-icons/ri';
import {BsCheck} from 'react-icons/bs';
import {AiOutlinePlus} from 'react-icons/ai';
import {BiChevronDown} from 'react-icons/bi';
import firebaseAuth from '../utils/firebase-config';
import { onAuthStateChanged} from 'firebase/auth';
import axios from "axios";
import {removeMovieFromLiked} from '../store';
import { useDispatch } from 'react-redux';

export default React.memo(function Card({ movieData, islike = false }) {
  const navigate = useNavigate()
  const [isHover, setIsHover] = useState(false);
  const [email,setEmail] = useState(undefined);
  const dispatch = useDispatch();
  
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });
  const addToList = async ()=>{
    
    try{ 
      await axios.post("https://gleaming-elk-tam.cyclic.app/api/user/add",{email,data:movieData})
    }catch(error){
      console.log(error);
    }
  }

  return (
    <Container onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt='movie'
      />
      {
        isHover &&
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt='movie'
              onClick={() => navigate('/video')}
            />
            <video
              src={Video}
              autoPlay
              loop
              muted
              onClick={() => navigate('/video')}
            />
          </div>
          <div className="info-container flex column">
                <h3 className="name" 
                onClick={() => navigate('/video')}>{movieData.name}</h3>
                <div className="icon flex j-between">
                    <div className="controls flex">
                          <IoPlayCircleSharp title='play'
                           onClick={() => navigate('/video')}/>
                          <RiThumbUpFill title="Like" className='i' />
                          <RiThumbDownFill title='Dislike' className='i'/>
                          {
                            islike ? <BsCheck title='Remove From List' 
                            onClick={() =>
                              dispatch(
                                removeMovieFromLiked({ email, movieId: movieData.id})
                              )
                            }/> : 
                            <AiOutlinePlus title='Add To List' onClick={addToList} />
                          }
                    </div>
                    <div className="info">
                      <BiChevronDown title='More Info' />
                    </div>                   
                </div>
                <div className="genres flex">
                      <ul className="flex">
                        {
                          movieData.generes.map((genere)=>
                            <li key={genere} >{genere}</li>
                          )
                        }
                      </ul>
                    </div>
          </div>
        </div>
      }
    </Container>
  )
})





const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons{
      .controls{
        display: flex;
        gap: 1rem;
      }
      }
      svg{
        margin-right: 1rem;
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;