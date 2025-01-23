'use client'

import ECommerce from "@/components/tailadmin/Dashboard/E-commerce";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  useAuth(["admin"]);
  
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
