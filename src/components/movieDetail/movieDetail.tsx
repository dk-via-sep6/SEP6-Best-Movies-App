// MovieDetail.tsx

import React from "react";
import { useParams } from "react-router-dom";

const MovieDetail: React.FC = () => {
  let { id } = useParams();

  // Fetch the movie details using the id or retrieve it from your state management
  // ...

  return (
    <div>
      <h1>Movie Detail Page for ID: {id}</h1>
      {/* Display the movie details here */}
    </div>
  );
};

export default MovieDetail;
