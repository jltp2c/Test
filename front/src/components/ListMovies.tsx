import { useState, useEffect } from "react";

const API =
  "https://api.themoviedb.org/3/discover/movie?api_key=ad2c28e0345278f3c8b002efddadf28f";

export interface typeMovie {
  id: string;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

function ListMovies() {
  const [listMovies, setListMovies] = useState<typeMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortByRelease, setSortByRelease] = useState(false);

  //affiche la description et la note
  //desolé je n'ai pas pu faire ca sur une page par manque de temps
  //je ne trouve pas l'api par ID pour chaque film par manque de temps
  const handleToggle = (movie) => {
    if (selectedMovie === movie) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  //ordre release par film
  const handleSortByRelease = () => {
    console.log("test");
    setSortByRelease(!sortByRelease);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const resp = await fetch(API);
        if (!resp.ok) {
          console.log("Erreur, pas de film!");
        }
        const datafetching = await resp.json();
        console.log(datafetching.results);
        // ne marhe pas surement une erreur sur le type, l'idee c'est de typé la date en number et afficher les films par leur ordre de sortie.
        if (sortByRelease) {
          datafetching.results = datafetching.results.sort(
            (a, b) => a.release_date - b.release_date
          );
        }
        setListMovies(datafetching.results);
      } catch (error) {
        console.log("Api error", error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <section className="flex flex-col gap-10 items-center">
      <button
        className="border-2 rounded-sm p-2 w-50"
        onClick={handleSortByRelease}>
        Ordre date release
      </button>
      <div className="flex flex-wrap gap-10 justify-center">
        {listMovies.map((movie) => {
          const isMovieSelected = selectedMovie === movie;
          return (
            <div
              key={movie.id}
              className="movie flex flex-col justify-center items-center gap-5">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                onClick={() => handleToggle(movie)}
              />
              <p>{movie.title}</p>
              {isMovieSelected && (
                <div className="border-2 border-black w-96 rounded-sm text-center p-2 flex flex-col gap-5">
                  <p>{movie.overview}</p>
                  <p>Note : {movie.vote_average} ⭐</p>
                </div>
              )}

              <p>{movie.release_date}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ListMovies;
