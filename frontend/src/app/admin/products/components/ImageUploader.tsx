import Image from "next/image";
import { useState } from "react";

interface ImageUploaderProps {
  onFileSelect: (files: File[]) => void;
}

const ImageUploader: React.FC<imgUploaderProps> = ({ onFileSelect }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
    onFileSelect(files);
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    onFileSelect(updatedFiles);
  };

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor="multiImageUploader"
        className="mb-3 block text-sm font-medium text-black dark:text-white"
      >
        Gambar Produk
      </label>
      <div
        className={`relative flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed`}
      >
        <div className="flex flex-wrap gap-2">
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200 dark:bg-boxdark"
            >
              <img
                width={100}
                height={100}
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-1 top-1 z-99 h-6 w-6 rounded-full bg-red-500 font-bold text-white shadow-lg hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          id="multiImageUploader"
          accept="image/*"
          multiple
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleImageChange}
        />
        {previewUrls.length === 0 && (
          <div className="text-center">
            <p className="text-sm text-black dark:text-white">
              Seret dan jatuhkan atau klik untuk unggah
            </p>
            <p className="text-xs text-gray-500">Maksimal ukuran file: 5MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
