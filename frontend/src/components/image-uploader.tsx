/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onSubmit: (file: File) => Promise<void>;
}

export const ImageUploader: React.FC<imgUploaderProps> = ({ onSubmit }) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");

  const formSchema = z.object({
    image: z
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 5000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values.image);
      toast.success(`Image uploaded successfully 🎉 ${values.image.name}`);
      setPreview(null); // Clear preview after successful upload
      form.reset();
    } catch (error) {
      toast.error("Failed to upload the image. Please try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full rounded-lg bg-white p-4"
      >
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="mx-auto">
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <h2 className="text-lg font-semibold tracking-tight md:text-xl">
                  Upload bukti pembayaran
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="border-foreground shadow-foreground mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border p-8 shadow-sm"
                >
                  {preview && (
                    <img
                      src={preview as string}
                      alt="Uploaded image"
                      className="max-h-[400px] rounded-lg"
                    />
                  )}
                  <imgPlus
                    className={`size-20 ${preview ? "hidden" : "block"}`}
                  />
                  <Input {...getInputProps()} type="file" />
                  {isDragActive ? (
                    <p className="text-center text-xs md:text-base">
                      Drop the image!
                    </p>
                  ) : (
                    <p className="text-center text-xs md:text-base">
                      Klik di sini atau seret gambar untuk mengunggahnya.{" "}
                      <span>Maksimal 5 mb</span>
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type png, jpg, or jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mx-auto mt-2 block h-auto rounded-lg px-8"
        >
          Kirim
        </Button>
      </form>
    </Form>
  );
};
