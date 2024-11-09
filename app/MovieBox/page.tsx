"use client";

import Image from "next/image";
type MovieBoxProp = {
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
};

const MovieBox = ({
  title,
  posterPath,
  releaseDate,
  voteAverage,
}: MovieBoxProp) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-[360px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{title}</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{new Date(releaseDate).getFullYear()}</span>
          <span>⭐ {voteAverage.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieBox;
