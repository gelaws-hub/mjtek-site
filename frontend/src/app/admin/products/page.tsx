import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import React from "react";
import ProductTables from "./components/product-tables";
import ProductOptions from "./components/productOptions";

const ProductPage: React.FC = () => {

  return (
    <DefaultLayout>
      <ProductOptions />
      <ProductTables />
    </DefaultLayout>
  );
};

export default ProductPage;
