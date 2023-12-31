import { fetchGallery } from "@/services/GalleryService";
import { IGalleryHandler} from "@/types/IGalleryServiceHandler";
import { Photo } from "@/types/Photo";
import { useRef, useState } from "react";

const GalleryHandler = ({ setIsLoading, setPhotos, isLoading }: IGalleryHandler) => {

  const [page, setPage] = useState<number>(1);

  const SCROLL_OFFSET = 300 ;
  

  const getGallery = async () => {
    setIsLoading(true);

    try {
      const data: Photo[] = await fetchGallery(page);
      for (let i in data) {
        data[i].download_url = `https://picsum.photos/id/${data[i].id}/500/333`
      }
      setPhotos(prevPhotos => [...prevPhotos, ...data]);
      setPage((prevPage: number) => prevPage + 1);
    } catch (error) {
      console.error("Erro na consulta a API: ", error);

    } finally {
      setIsLoading(false);
    }
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + SCROLL_OFFSET >=
      document.documentElement.scrollHeight
    ) {
      if (!isLoading && page != 1) {
        getGallery();
      }
    } else {
      return;
    }
  };

  return { getGallery, handleScroll }
}

export default GalleryHandler;