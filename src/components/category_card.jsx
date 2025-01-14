import React from "react";
import Image from "next/image";

const Card = ({ title, imageSrc }) => {
  return (
    <div className="group border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white">
      <div className="relative w-full h-60 overflow-hidden">
        {/* Optimized image with Next.js */}
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-center capitalize group-hover:text-[#ff5722] transition-colors duration-300">
        {title}
      </h3>
    </div>
  );
};

export default Card;
