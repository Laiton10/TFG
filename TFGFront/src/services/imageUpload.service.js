
import axios from "axios";

export function useUploadImage() {
  const upload = async (file, userId) => {
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(`http://localhost:8080/usuarios/${userId}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return true;
    } catch (err) {
      console.error("Error al subir imagen:", err);
      return false;
    }
  };

  return { upload };
}