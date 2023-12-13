import { Photo } from "@/types/Photo";


export const fetchGallery = async (page:number)=>{
    try {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=6`
        );
        const data = await response.json();
  
        const updatedPhotos = data.map((photo: Photo, index: number) => ({
          ...photo,
          download_url: `https://picsum.photos/id/${photo.id}/500/333`,
        }));
        
        return updatedPhotos;
      } catch (error) {
        console.log("Erro ao carregar fotos:", error);}
}