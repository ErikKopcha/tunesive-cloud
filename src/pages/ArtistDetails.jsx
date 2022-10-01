import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../store/services/shazamCore";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error: errorGetArtistDetails
  } = useGetArtistDetailsQuery(artistId);
  
  if (isFetchingArtistDetails) {
    return <Loader title={'Searching artist details'} />
  }

  if (errorGetArtistDetails) {
    return <Error />
  }
  
  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      />
  
      <RelatedSongs
        artistId={artistId}
        data={Object.values(artistData?.songs)}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  )
};

export default ArtistDetails;
