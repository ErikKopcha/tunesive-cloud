import { useState } from 'react';
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from "../store/services/shazamCore";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  
  const {
    data,
    isFetching,
    error
  } = useGetTopChartsQuery();
  
  if (isFetching) {
    return <Loader title={'Loading top charts you'} />
  }
  
  if (error) {
    return <Error />
  }
  
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            ket={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  )
};

export default TopCharts;
