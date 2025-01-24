'use client'

import ECommerce from "@/components/tailadmin/Dashboard/E-commerce";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";

export default function Home() {
  
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
