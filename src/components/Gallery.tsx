"use client";
import React, { useState, useEffect, useRef } from "react";
import { Photo } from "@/types/Photo";
import GalleryHandler from "@/handler/GalleryHandler";
const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getGallery, handleScroll } = GalleryHandler({
    setIsLoading,
    setPhotos,
    isLoading,
  });

  useEffect(() => {
    getGallery();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className=" w-full bg-blackB7Gallery pb-6 ">
      <div className=" xl:max-w-7xl mx-auto p-6 xl:p-0 xl:mt-6 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {photos.map((item, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${item.download_url})` }}
            className="max-w-[344px] sm:max-w-none w-full aspect-[7/5] bg-white rounded-lg place-self-center bg-center bg-no-repeat bg-cover"
          ></div>
        ))}
      </div>
      {isLoading && (
        <div className="border border-gray-600 w-fit flex p-3 m-auto mt-3 text-white">
          <div className="animate-spin h-5 w-5 border border-white border-t border-t-gray-700 rounded-full mr-3"></div>
          Carregando...
        </div>
      )}
    </div>
  );
};

export default Gallery;
