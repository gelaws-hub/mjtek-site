'use client';

import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import React, { useState } from "react";
import ProductTables from "./components/product-tables";
import ProductOptions from "./components/productOptions";
import { RefreshContext } from "./components/refreshContext"

const ProductPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <DefaultLayout>
      <RefreshContext.Provider value={[refresh, setRefresh]}>
        {`context : ${refresh}`}
        <ProductOptions />
        <ProductTables />
      </RefreshContext.Provider>
    </DefaultLayout>
  );
};

export default ProductPage;
