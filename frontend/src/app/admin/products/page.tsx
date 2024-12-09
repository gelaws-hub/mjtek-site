'use client';

import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import React from "react";
import ProductTables from "./components/product-tables";
import ProductOptions from "./components/productOptions";
import GreenAlerts from "@/components/alerts/GreenAlerts";

const ProductPage: React.FC = () => {
  return (
    <DefaultLayout>
      <ProductOptions />
      <ProductTables />
    </DefaultLayout>
  );
};

export default ProductPage;
