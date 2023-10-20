import { useLocation, Link } from "react-router-dom";
import { typeMovie } from "../components/ListMovies";

function DetailMovie() {
  const location = useLocation();
  const propsMovie = location.state;

  const idMovie = parseInt(location.pathname.slice(7));
  const movieSelected = propsMovie.listMovies.find(
    (t: typeMovie) => t.id === idMovie
  );

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1>Movie : {movieSelected.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieSelected.backdrop_path}`}
        alt={movieSelected.title}
      />

      <p>{movieSelected.overview}</p>
      <p>Country : {movieSelected.original_language}</p>
      <p>Note : {movieSelected.vote_average} ⭐</p>
      <Link to={`/`}>
        <button className="border-2 rounded-md p-1">Return</button>
      </Link>
    </div>
  );
}

export default DetailMovie;
