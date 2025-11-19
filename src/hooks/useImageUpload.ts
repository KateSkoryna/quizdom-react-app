import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

interface UseImageUploadProps {
  imageFile?: File;
  onUploadComplete: (url: string) => void;
}

interface ImageError {
  code: string;
  message: string;
}

export const useImageUpload = ({
  imageFile,
  onUploadComplete,
}: UseImageUploadProps) => {
  const [progressUpload, setProgressUpload] = useState(0);
  const [error, setError] = useState<ImageError | null>(null);

  useEffect(() => {
    const handleUploadFile = () => {
      if (imageFile) {
        const name = (new Date().getTime() + imageFile.name).replace(/\s/g, "");
        const storageRef = ref(storage, `image/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressUpload(progress);
          },
          (error) => {
            setError({
              code: error.code,
              message: error.message,
            });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              onUploadComplete(url);
            });
          }
        );
      }
    };

    if (imageFile) {
      handleUploadFile();
    }
  }, [imageFile, onUploadComplete]);

  const resetProgress = () => setProgressUpload(0);

  return { progressUpload, resetProgress, error };
};
