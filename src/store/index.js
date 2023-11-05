import{
    configureStore, 
    createAsyncThunk, 
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, TMDB_BASE_URL } from '../utils/constend';





const initialState = {
    movies : [],
    genresLoaded : false,
    genres : []
}

export const getGenres = createAsyncThunk("netflix/genres", async ()=>{
    const {data:{genres}} = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    
    return genres;
})

const createArrayFromRawData= (array,moviesArray,genres)=>{
       array.forEach((movie) => {
            const movieGeneres =[];
            movie.genre_ids.forEach((genre)=>{
                const name = genres.find(({id})=> id === genre);
                if(name) movieGeneres.push(name.name);
            })
            if(movie.backdrop_path){
                moviesArray.push({
                    id: movie.id,
                    name: movie?.original_name ? movie?.original_name : movie?.original_title,
                    image: movie.backdrop_path,
                    generes: movieGeneres.slice(0,3),
                })
            }
        });

}


const getRawData = async (api,genres,paging)=>{

    const moviesArray = [];

    for(let i=1; moviesArray.length <60 && i<10; i++){
            const {data : {results}} = await axios.get(`${api}${paging ? `&page=${i}`:""}`);
            createArrayFromRawData(results,moviesArray,genres);
    }
    return moviesArray;

}

export const fetchMovies = createAsyncThunk("netflix/trending", async ({type},thunkApi)=>{
            const { netflix: {genres},} = thunkApi.getState();
            return getRawData(
                `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
                genres,
                true
            );
            
})

export const fetchMoviesByGenres = createAsyncThunk("netflix/moviesByGenres", async ({genre,type},thunkApi)=>{
    const { netflix: {genres},} = thunkApi.getState();
    return getRawData(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres,
    );
    
})

export const getUsersLikedMovies =  createAsyncThunk("netflix/likeMovies",async(email)=>{
        const {data:{movies}} =
         await axios.get(`https://gleaming-elk-tam.cyclic.app/api/user/liked/${email}`);
        
        return  movies;
})

export const removeMovieFromLiked = createAsyncThunk("netflix/removeMovie",async({movieId, email})=>{
    console.log(movieId, email)
    const {data:{movies}} =
    await axios.put(`https://gleaming-elk-tam.cyclic.app/api/user/delate`,{email,movieId});
    return  movies;
})

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder)=> {
        builder.addCase(getGenres.fulfilled,(state,action)=>{
                state.genres = action.payload;
                state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
            state.movies = action.payload;
        });
        builder.addCase(fetchMoviesByGenres.fulfilled,(state,action)=>{
            state.movies = action.payload;
        });
        builder.addCase(getUsersLikedMovies.fulfilled,(state,action)=>{
            state.movies = action.payload;
        });
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
})

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    }
})