import SongBar from './SongBar';

const RelatedSongs = ({ data, activeSong, isPlaying, handlePlayClick, handlePauseClick, artistId }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          i={i}
          key={`${song.key}-${artistId}-${i}`}
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          artistId={artistId}
          handlePlayClick={handlePlayClick}
          handlePauseClick={handlePauseClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
