import React, { useEffect,useState, useRef } from 'react'
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();


  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjBmMmI3MDRjYjQ0NjU4ZDM4YWZmOTM5MWY3NTQ3MSIsIm5iZiI6MTc0OTQ1MDA4MS43MjUsInN1YiI6IjY4NDY3ZDYxN2VlNWU5MDAwOGZkNWYxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i16N6m1NowgbsjbPJ4ti2Fkr_oON4GKS-dCXRiO3HEw'
  }
};


const handleWheel = (event) => {
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err))

  cardsRef.current.addEventListener('wheel', handleWheel);
},[])
  return (
    <div className='titlecards'>
      <h2>{title? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        }) }
      </div>
    </div>
  )
}

export default TitleCards
