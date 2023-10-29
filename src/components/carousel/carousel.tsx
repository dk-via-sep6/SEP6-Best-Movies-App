import { FunctionComponent } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./styles.css";
const Carousel: FunctionComponent = () => {
  const handleDragStart = (e: any) => e.preventDefault();

  const items = [
    <img
      src="https://upload.wikimedia.org/wikipedia/en/d/db/The_Movies_Coverart.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://cdn.marvel.com/content/1x/themarvels_lob_crd_05.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00367366-edhelbccrs-portrait.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://play-lh.googleusercontent.com/kiHauzwHq1U64eL4XbdhJG3--vGMj5hbM8O4AQVpyOEgT65BZC5MsjeZEvb4hIZDLBh8gBTSlelOPyoDlg4B"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_2_5x/sources/r1/cms/prod/4526/1534526-v-ebf6f46b5514"
      onDragStart={handleDragStart}
      role="presentation"
    />,

    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3rE_cEh3ckUxi2xIMVdgmZw2xaQ3NtAqsgA&usqp=CAU"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://cdn.marvel.com/content/1x/shangchi_lob_crd_07.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://cdn.moviefone.com/admin-uploads/posters/wonka-movie-poster_1689098127.jpg?d=360x540&q=60"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://upload.wikimedia.org/wikipedia/en/d/db/The_Movies_Coverart.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://cdn.marvel.com/content/1x/themarvels_lob_crd_05.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00367366-edhelbccrs-portrait.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://play-lh.googleusercontent.com/kiHauzwHq1U64eL4XbdhJG3--vGMj5hbM8O4AQVpyOEgT65BZC5MsjeZEvb4hIZDLBh8gBTSlelOPyoDlg4B"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_2_5x/sources/r1/cms/prod/4526/1534526-v-ebf6f46b5514"
      onDragStart={handleDragStart}
      role="presentation"
    />,

    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3rE_cEh3ckUxi2xIMVdgmZw2xaQ3NtAqsgA&usqp=CAU"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://cdn.marvel.com/content/1x/shangchi_lob_crd_07.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://cdn.moviefone.com/admin-uploads/posters/wonka-movie-poster_1689098127.jpg?d=360x540&q=60"
      onDragStart={handleDragStart}
      role="presentation"
    />,
  ];
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
