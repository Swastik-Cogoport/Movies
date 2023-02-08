import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import '../index.css'

export default function Layout() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [year, setYear] = useState('');
    const [showmovies, setShowemovies] = useState(movies);
    const [isClicked, setIsClicked] = useState(Array(10).fill(false));
    const [movieID,setMovieID] = useState('');


    const y = (new Date()).getFullYear();
    const years = Array.from(new Array(25), (val, index) => y - index);

    useEffect(() => {
        getMovies(year);
    }, [])

    useEffect(() => {
        getMovies(year);
    }, [year])

    const handleClick = (index) => {
        
        setIsClicked(isClicked.map((c, i) => {
            if (i == index) {
                return !c;
            }
            else return c;
        }));
    }

    useEffect(() => {
        console.log(isClicked);
        setMovies([...movies])
    }, [isClicked])


    const getByID = async (movieID) => {
        try {
            let moviesRequest;
            if(movieID===""){
                getMovies(year)
            } else {
                console.log("hello");
                moviesRequest = await axios.get(`https://www.omdbapi.com/?i=${movieID}&apikey=d0108237`)
                setMovies([moviesRequest.data])
            }
            console.log(moviesRequest.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getMovies = async (year = '') => {
        try {
            let moviesRequest;
            if (search.length > 2) {
                moviesRequest = await axios.get(
                    `http://www.omdbapi.com/?s=${search}&y=${year}&apikey=d0108237`
                )
            }
            else {
                moviesRequest = await axios.get(
                    `http://www.omdbapi.com/?s=Iron&y=${year}&apikey=d0108237`
                )
            }
            console.log(moviesRequest.data.Search)
            setMovies(moviesRequest.data.Search)
        }
        catch (error) {
            console.log(error)
        }
    }

    const filterYear = (e) => {
        setYear(e.target.value)
    }
    // useEffect(() => {
    //   getMovies(page,year);
    // },[page])



    return (
        <div className="boxContainer">
                <h1 style={{ display: 'flex', justifyContent: 'center', background: 'black', color: 'white' }}>Cogoport IMDB</h1>
            <div className="layoutInput">
                <div className="layoutInputSearch">
                    <input type="text" placeholder="Type movie name here" onChange={(e) => { setSearch(e.target.value) }} />
                    {/* <button onClick={(() => {getMovies(search)})}> Search </button> */}
                    <button onClick={(() => { getMovies(year) })}> Search </button>
                </div>

                <div className="layoutInputSearch">
                    <input type="text" placeholder="Type IMDB ID" onChange={(e) => { setMovieID(e.target.value) }} />
                    {/* <button onClick={(() => {getMovies(search)})}> Search </button> */}
                    <button onClick={(() => { getByID(movieID) })}> Search </button>
                </div>

                
                <div className="layoutInputSearch">
                     <select onChange={filterYear}>
                        <option value="" hidden >Year</option>
                        {
                            years.map((year, index) => {
                                return <option key={`year${index}`} value={year}>{year}</option>
                            })
                        }
                    </select>
                </div>
            </div>

            <div className="moviesContainer">
                {movies == undefined ? (
                    <div> Movies not found</div>
                ) :
                    movies.length > 0 ? movies.map((movie, i) => {
                        return (
                            <>
                                <div className="movieCard">
                                    <div className="movieCard-Img-Box">
                                        <Link to={`/${movie.imdbID}`}>
                                            <img className="movieCard-Img" src={movie.Poster} />
                                        </Link>
                                    </div>
                                    <div className="movieCard-Content">
                                        <div><p>{movie.Title}</p></div>
                                        <div><button onClick={() => handleClick(i)}> {isClicked[i] ? 'Unlike' : 'Like'}</button></div>
                                    </div>
                                </div>
                            </>
                        )
                    }) : ''
                }
            </div>
        </div>
    )
}

{/* </div>ReactDOM.render(<App/>, document.getElementById('root')); */ }


