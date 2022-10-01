import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../store/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../store/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: errorSong
  } = useGetSongDetailsQuery(songid);
  
  const {
    data: relatedSongsData,
    isFetching: isFetchingRelatedSong,
    error: errorRelatedSongs
  } = useGetSongRelatedQuery(songid);
  
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }
  
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, relatedSongsData, i }));
    dispatch(playPause(true));
  }
  
  if (isFetchingSongDetails || isFetchingRelatedSong) {
    return <Loader title={'Searching song details'} />
  }
  
  if (errorSong || errorRelatedSongs) {
    return <Error />
  }
  
  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={""}
        songData={songData}
      />
      
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        
        <div className="mt-5">
          {songData?.sections[1]?.type === "LYRICS" ? (
            songData.sections[1].text.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">Sorry, no lyrics found!</p>
          )}
        </div>
      </div>
      
      <RelatedSongs
        data={relatedSongsData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  )
};

export default SongDetails;
