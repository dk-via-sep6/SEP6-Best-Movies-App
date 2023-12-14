import { FunctionComponent } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Movie } from "../../model/movie";

type CarouselProps = {
  movies: Movie[];
};

const Carousel: FunctionComponent<CarouselProps> = ({ movies }) => {
  const navigate = useNavigate();
  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) =>
    e.preventDefault();

  const items = movies.map((movie) => (
    <img
      key={movie.id}
      src={"https://image.tmdb.org/t/p/w500" + movie.posterPath}
      alt={movie.title}
      onDragStart={handleDragStart}
      onClick={() => handleMovieClick(movie.id)}
      role="presentation"
      style={{ cursor: "pointer" }}
    />
  ));

  return (
    <div className="innerCarouselContainer">
      <AliceCarousel
        responsive={{
          0: { items: 10, itemsFit: "contain" },
          600: { items: 10, itemsFit: "contain" },
          1024: { items: 10, itemsFit: "contain" },
        }}
        mouseTracking
        items={items}
        autoPlay
        infinite
        autoHeight
        autoPlayInterval={3000}
        disableDotsControls
        disableButtonsControls
      ></AliceCarousel>
    </div>
  );
};
export default Carousel;
