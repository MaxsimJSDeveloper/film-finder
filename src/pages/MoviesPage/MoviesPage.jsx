import { useSearchParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieByKeyword } from "../../api/apiServices";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import css from "./MoviesPage.module.css";

const notify = (msg) =>
  toast.error(`${msg}`, {
    style: {
      border: "1px solid #000000",
      padding: "16px",
      color: "#000000",
    },
    iconTheme: {
      primary: "#000000",
      secondary: "#f5f5f5",
    },
  });

export default function MoviesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName") ?? "";
  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movieName === "") {
      notify("Please, enter the keyword!");
      return;
    }
    setMoviesList([]);
    setLoading(true);
    const getMovieByKeyword = async (movieName) => {
      try {
        await fetchMovieByKeyword(movieName).then((data) => {
          if (!data.results.length) {
            setLoading(false);
            setError(true);
            notify("There is no movies with this request. Please, try again");
            return;
          }
          setError(false);
          setMoviesList(data.results);
        });
      } catch (error) {
        notify("Error, try again!");
      } finally {
        setLoading(false);
      }
    };
    getMovieByKeyword(movieName);
  }, [movieName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchForm = e.currentTarget;
    setSearchParams({ movieName: searchForm.elements.movieName.value });
    searchForm.reset();
  };

  return (
    <main className="container">
      <div className={css.moviesPage}>
        <SearchBar onSubmit={handleSubmit} />
        {error && (
          <p>There is no movies with this request. Please, try again</p>
        )}
        <ul className={css.movieList}>
          {moviesList.map((movie) => {
            return (
              <li key={movie.id}>
                <Link
                  to={`/movies/${movie.id}`}
                  state={{ from: location }}
                  className={css.item}
                >
                  {movie.original_title || movie.name}
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : `http://www.suryalaya.org/images/no_image.jpg`
                    }
                    loading="lazy"
                    alt="Movie poster"
                    className={css.img}
                  />
                </Link>
              </li>
            );
          })}
          {loading && <Loader />}
        </ul>
      </div>
    </main>
  );
}
