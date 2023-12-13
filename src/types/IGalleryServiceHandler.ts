import { SetStateAction } from "react";
import { Photo } from "./Photo";

export interface IGalleryHandler {
    setIsLoading: (isLoading: SetStateAction<boolean>) => void;
    setPhotos: (photos: SetStateAction<Photo[]>) => void;
    isLoading: boolean;
}