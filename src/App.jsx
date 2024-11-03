import { useState , useEffect } from 'react'
import './App.css'
import SearchIcon from './assets/search.svg'
import MovieCard from './MovieCard'

const App = () => {

  const URL = "http://www.omdbapi.com?apikey=8a11bddb"

  const [movies , setMovies] = useState([])
  const [searchString , setSearcgString] = useState('')

  const movie = async(movieTitle) => {
    const response = await fetch(`${URL}&s=${movieTitle}`)
    const data = await response.json()
    setMovies(data.Search)
  }


  useEffect(() => {
    movie({searchString})  
  }, [])

  return (
    <div className='app'>
        <h1>Movies Center</h1>

        <div className='search'>
            <input 
            type="text"
            placeholder='Search movies'
            value= {searchString}
            onChange={(e) => setSearcgString(e.target.value)} />

            <img 
            src= {SearchIcon} 
            alt="Search Icon" 
            onClick={() => movie(searchString)}/>
        </div>
        
        {
          movies?.length > 0 ? (
            <div className='container'>
                {
                  movies.map((movie , index) => (
                    <MovieCard  key = {index} movie={movie}/>
                  ))
                }
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
        }
    </div>
  )
}

export default App
