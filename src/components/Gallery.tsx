"use client";
import React, { useState, useEffect, useRef } from "react";
import { Photo } from "@/types/Photo";
const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const lastLoadedPage = useRef(1);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=6`
      );
      const data = await response.json();

      const updatedPhotos = data.map((photo: Photo, index: number) => ({
        ...photo,
        download_url: `https://picsum.photos/id/${photo.id}/500/333`,
      }));

      setPhotos((photos) => [...photos, ...updatedPhotos]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log("Erro ao carregar fotos:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 300 >=
      document.documentElement.scrollHeight
    ) {
      if(!isLoading && page != lastLoadedPage.current){

      fetchData();
      }
    } else {
      return;
    }
  };

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
