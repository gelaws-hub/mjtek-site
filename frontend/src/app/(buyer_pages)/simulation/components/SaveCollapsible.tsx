"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import TextareaAutosize from "react-textarea-autosize";
import { SimData, SimMeta } from "./Interfaces";
import { errorToast, successToast } from "@/components/toast/reactToastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useRefreshContext } from "@/lib/refreshContext";

// Define validation schema using Zod
const simulationSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Judul harus memiliki minimal 4 karakter" }), 
  description: z
    .string()
    .min(4, { message: "Deskripsi harus memiliki minimal 4 karakter" }),
});

export function SaveCollapsible({
  simInfo,
  onSave,
  simData,
}: {
  simInfo: SimMeta;
  onSave?: () => void;
  simData: SimData;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [refresh, setRefresh] = useRefreshContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const simIdParams = searchParams.get("id");

  // Initialize Formik with validation
  const formik = useFormik({
    initialValues: {
      title: simInfo.title || "",
      description: simInfo.description || "",
    },
    validationSchema: toFormikValidationSchema(simulationSchema),
    onSubmit: async (values) => {
      try {
        const body = {
          simulation_data: simData,
          title: values.title,
          description: values.description,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/simulation${simInfo?.id ? `/${simInfo?.id}` : ""}`,
          {
            method: simInfo?.id ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include",
          }
        );

        if (response.status === 401) {
          errorToast("Anda harus login terlebih dahulu", "top-left");
          return;
        }

        const data = await response.json();
        successToast(`Simulasi berhasil disimpan sebagai ${data.title} dengan id ${data.id}`, "top-left");
        setIsOpen(false);
        onSave?.();
        setRefresh((refresh) => !refresh);
        router.push(`/simulation?id=${data.id}`);
      } catch (error) {
        errorToast("Gagal menyimpan simulasi", "top-left");
        console.error("Error saving simulation:", error);
      }
    },
  });

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <CollapsibleTrigger asChild>
        <div
          className={`flex w-full cursor-pointer items-center justify-between rounded-md border px-2 ${simInfo.id == simIdParams ? "border-blue-900 hover:border-blue-700" : ""}`}
          role="button"
        >
          <h4 className="truncate text-sm font-semibold">
            {simInfo.id == simIdParams ? `${simInfo.title} (lokasi asli)` : "Tambah simulasi baru"}
          </h4>
          <Button variant="ghost" size="sm">
            <ChevronRight
              className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-90" : ""
              }`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className={`flex flex-col space-y-2 rounded-b-md border py-2 ${!isOpen && "hidden"} ${simInfo.id == simIdParams ? "border-blue-900 hover:border-blue-700" : ""}`} style={{marginTop: 0}}>
        {simInfo.id && (
          <div className="px-4 text-sm">
            <span>ID : </span> {simInfo.id}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-3 flex flex-col">
          {/* Title Input */}
          <div className="flex flex-col px-4 text-sm">
            <label htmlFor="title" className="font-medium">
              Judul simulasi:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="Silahkan masukkan judul"
              className={`rounded-md border p-2 ${
                formik.touched.title && formik.errors.title ? "border-red-500" : ""
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-xs text-red-500">{formik.errors.title}</p>
            )}
          </div>

          {/* Description Input */}
          <div className="flex flex-col px-4 text-sm">
            <label htmlFor="description" className="font-medium">
              Deskripsi:
            </label>
            <TextareaAutosize
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              placeholder="Silahkan masukkan deskripsi"
              className={`rounded-md border p-2 ${
                formik.touched.description && formik.errors.description ? "border-red-500" : ""
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-xs text-red-500">{formik.errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="m-4 ml-auto py-1"
            size="sm"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Simpan
          </Button>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
