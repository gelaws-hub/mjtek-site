import ECommerce from "@/components/tailadmin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Mj Teknologi Semarang Admin Page",
  description: "This page is for MJ Teknologi Semarang Website",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
