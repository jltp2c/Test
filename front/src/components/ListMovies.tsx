import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API =
  "https://api.themoviedb.org/3/discover/movie?api_key=ad2c28e0345278f3c8b002efddadf28f";

export interface typeMovie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

function ListMovies() {
  const [listMovies, setListMovies] = useState<typeMovie[]>([]);
  const [sortByRelease, setSortByRelease] = useState(false);

  //affiche la description et la note
  //desolé je n'ai pas pu faire ca sur une page par manque de temps
  //je ne trouve pas l'api par ID pour chaque film par manque de temps

  //ordre release par film
  const handleSortByRelease = () => {
    setSortByRelease(!sortByRelease);
    console.log(sortByRelease);
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

        setListMovies(datafetching.results);
      } catch (error) {
        console.log("Api error", error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <section className="flex flex-col gap-10 items-center">
      <h1 className="text-5xl">Movies</h1>
      <button
        className="border-2 rounded-sm p-2 w-50"
        onClick={handleSortByRelease}>
        Ordre date release
      </button>
      <div className="flex flex-wrap gap-10 justify-center">
        {listMovies
          .sort((a, b) => {
            const dateA = Date.parse(a.release_date);
            const dateB = Date.parse(b.release_date);
            if (sortByRelease) {
              return dateA - dateB;
            } else {
              return dateB - dateA;
            }
          })
          .map((movie) => {
            return (
              <div
                key={movie.id}
                className="movie flex flex-col justify-center items-center gap-5">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>

                <p>{movie.release_date}</p>
                <Link to={`/movie/${movie.id}`} state={{ listMovies }}>
                  <button className="border-2 rounded-md p-1">Details</button>
                </Link>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default ListMovies;
