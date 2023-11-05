import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import firebaseAuth from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import { getUsersLikedMovies } from '../store';

import Card from '../components/Card';


export default function Mylist() {

  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.movies);
  const [email, setEmail] = useState(undefined);
  const dispatch = useDispatch();

 
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });
  
  useEffect(() => {  
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [email]);
  
  return (
    <Container>
      <div className="navber">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">

          {
          movies ? (movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                islike={true}
              />
            );
          })):("")
          }
        </div>
      </div>
    </Container>
  )
}


const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;