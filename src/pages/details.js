import React,{useState, useEffect} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../display.css';

export default function Details() {
    const id = useParams();
    const [movieDetails, setMovieDetails] = useState("");
    const GetmovieDetails = async() =>{
        const moviesRequestID = await axios.get(
           `http://www.omdbapi.com/?i=${id.id}&apikey=d0108237`
        );
        // con
        // console.log("hit");
        // console.log(moviesRequestID.data);
        setMovieDetails(moviesRequestID.data);
    }
    // console.log({movieDetails.title});
    useEffect(()=>{
        GetmovieDetails();
    },[])
    // console.log(id)
    return(
        <>
        {
            movieDetails?
            <>
            <div className="mdetails">
            <h1>MOVIE DETAILS</h1>
            </div>
            <div className="movposter">
            <img src={movieDetails.Poster}/>
            </div>
            <div className="moredetails">
                <h2>
                    Title:
                </h2>
                <p>{movieDetails.Title}</p>
                <h2>Year:</h2>
                <p>{movieDetails.Year}</p>
                <h2>IMDB ID:</h2>
                <p>{movieDetails.imdbID}</p>        
                <h2>genre</h2>
                <p>{movieDetails.Genre}</p>
            </div>
            </>
            :'Wait'
        }
        </>
    )
}
