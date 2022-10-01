import { ArtistCard, Error, Loader } from '../components';
import { useParams } from "react-router-dom";
import { useGetSongsBySearchQuery } from "../store/services/shazamCore";

const Search = () => {
  const { searchTerm } = useParams();
  
  const {
    data,
    isFetching,
    error
  } = useGetSongsBySearchQuery(searchTerm);
  
  const songs = data?.tracks?.hits?.map(song => song.track);
  
  if (isFetching) {
    return <Loader title={'Loading top charts you'} />
  }
  
  if (error) {
    return <Error />
  }
  
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((track, i) => (
          <ArtistCard
            key={track.key}
            track={track}
          />
        ))}
      </div>
    </div>
  )
};

export default Search;
