import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { useEffect } from 'react';
import firebaseAuth from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Notavailable from '../components/Notavailable';
import Selectgenere from '../components/Selectgenere';


export default function Tvshow() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenres())
    }, [])

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: "tv" }))
    }, []);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        // if (currentUser) navigate("/");
    });
    return (
        <Container >
            <div className="navber">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <Selectgenere genres={genres} type="tv"/>
                {
                    movies.length ? <Slider data={movies} /> : <Notavailable tv={true}/>
                }
            </div>

        </Container>
    )
}

const Container = styled.div`
    .data{
        margin-top: 8rem;
        .not-available{
            text-align: center;
            color: white;
            margin-top: 4rem;
        }
    }
`;