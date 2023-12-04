import { Dispatch } from 'redux';
import {
 fetchMovieFailure,
 fetchMovieStart,
 fetchMovieSuccess,
 clearMovie,
} from '../slices/movieSlice';

const serverUrl = 'https://localhost:32768/api'

export const fetchMovie = (movieId: string) => {
    return async (dispatch: Dispatch) =>{
        dispatch(fetchMovieStart())

        try{
            const response = await fetch(`${serverUrl}/movies/${movieId}`, {
                method: 'GET'
            });

            if(!response.ok){
                throw new Error('Failed to fetch movie.')
            }

            const data = await response.json();
            console.log(data)
            dispatch(fetchMovieSuccess(data));
        } catch (error) {
            dispatch(fetchMovieFailure("Network error. Please try again"))
        }
    };
}