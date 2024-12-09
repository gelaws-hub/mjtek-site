"use client";

import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import ProductTables from "./components/product-tables";
import ProductOptions from "./components/productOptions";

type RefreshContextType = [boolean, Dispatch<SetStateAction<boolean>>];

export const RefreshContext = React.createContext<
  RefreshContextType | undefined
>(undefined);

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

export const useRefreshContext = (): RefreshContextType => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error(
      "useRefreshContext must be used within a RefreshContext.Provider",
    );
  }
  return context;
};
