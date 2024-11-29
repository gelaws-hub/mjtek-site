import Chart from "@/components/tailadmin/Charts/page";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import React from "react";
import ProductTables from "./components/product-tables";

const ProductPage: React.FC = () => {
  return (
    <DefaultLayout>
      <ProductTables />
    </DefaultLayout>
  );
};

export default ProductPage;
