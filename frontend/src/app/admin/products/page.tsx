'use client';

import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import React, { useState } from "react";
import ProductTables from "./components/product-tables";
import ProductOptions from "./components/productOptions";
import { RefreshContext } from "./components/refreshContext"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'

const ProductPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <DefaultLayout>
      <RefreshContext.Provider value={[refresh, setRefresh]}>
        {/* <CompatibilitySelection /> */}
        <ProductOptions />
        <ProductTables />
      </RefreshContext.Provider>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default ProductPage;
