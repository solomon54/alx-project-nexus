import React from "react";

const MovieCardSkeleton: React.FC = () => {
  return (
    <div
      className="
        aspect-2/3
        min-w-35
        sm:min-w-40
        rounded-xl
        bg-zinc-800
        animate-pulse
      "
    />
  );
};

export default MovieCardSkeleton;
