"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CardSkeleton,
  CardsSkeleton,
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  InvoicesTableSkeleton,
  InvoiceSkeleton,
  InvoicesMobileSkeleton,
} from "@/components/ui/skeletons";

// Import static components
import { 
  SalesCard, 
  SalesChart, 
  OrdersChart, 
  OrderStatusChart, 
  TopBuyersTable 
} from "./components/StaticComponents";

// ChartThree is dynamically imported for better performance
const ChartThree = dynamic(
  () => import("@/components/tailadmin/Charts/ChartThree"),
  {
    ssr: false,
  },
);

import { Sales, Orders, OrdersByStatus, TopBuyers } from '@/types/admin';

const formatIndoType = (type: string) => {
  switch (type) {
    case "day":
      return "Hari";
    case "week":
      return "Minggu";
    case "month":
      return "Bulan";
    default:
      return "";
  }
};

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState<Sales[]>([
    { time: "Jan", total_income: "0" },
  ]);
  const [orders, setOrders] = useState<Orders[]>([
    { time: "Jan", total_orders: "0" },
  ]);

  const [ordersByStatus, setOrdersByStatus] = useState<OrdersByStatus[]>([
    { status: "finished", total_orders: "0" },
  ]);

  const [topBuyers, setTopBuyers] = useState<TopBuyers[]>([
    {
      nama: "",
      total_pembelian: 0,
      total_pendapatan: "",
      persentase_pendapatan: "",
    },
  ]);

  const searchParams = useSearchParams();
  const range = Number(searchParams.get("range")) || 6;
  const type = searchParams.get("type") || "month";
  const [query, setQuery] = useState<{ range: number; type: string }>({
    range,
    type,
  });

  const router = useRouter();

  const updateQueryParams = (range: number, type: string) => {
    const query = new URLSearchParams();

    if (range) {
      setQuery((prevQuery) => ({ ...prevQuery, range }));
      query.set("range", range.toString());
    }
    if (type) {
      setQuery((prevQuery) => ({ ...prevQuery, type }));
      query.set("type", type);
    }

    router.push(`?${query.toString()}`);
  };

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sales?range=${range}&type=${type}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await res.json();
        setSales(data.sales);
        setOrders(data.orders);
        setOrdersByStatus(data.ordersByStatus);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchTopBuyers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/top-buyers?range=${range}&type=${type}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await res.json();
        if (data.length < 5) {
          const dummyData: TopBuyers[] = [];
          for (let i = 0; i < 5 - data.length; i++) {
            dummyData.push({
              nama: "",
              total_pembelian: 0,
              total_pendapatan: "",
              persentase_pendapatan: "",
            });
          }
          setTopBuyers([...data, ...dummyData]);
        } else {
          setTopBuyers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopBuyers();
    fetchSales();
  }, [range, type]);

  return (
    <>
      <DefaultLayout>
        <div className="flex w-full justify-end p-2">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={() => updateQueryParams(range, "day")}
              className={`rounded px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark
               ${query.type === "day" && "bg-white dark:bg-boxdark"}`}
            >
              Harian
            </button>
            <button
              onClick={() => updateQueryParams(range, "week")}
              className={`rounded px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark
                ${query.type === "week" && "bg-white dark:bg-boxdark"}`}
            >
              Mingguan
            </button>
            <button
              onClick={() => updateQueryParams(range, "month")}
              className={`rounded px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark
                ${query.type === "month" && "bg-white dark:bg-boxdark"}`}
            >
              Bulanan
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-6">
          <Suspense fallback={<CardSkeleton className="col-span-1 lg:col-span-2 xl:col-span-3" />}>
            {isLoading ? (
              <CardSkeleton className="col-span-1 lg:col-span-2 xl:col-span-3" />
            ) : (
              <SalesCard sales={sales} range={range} type={type} />
            )}
          </Suspense>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <Suspense fallback={
            <RevenueChartSkeleton className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8" />
          }>
            {isLoading ? (
              <RevenueChartSkeleton className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8" />
            ) : (
              <SalesChart sales={sales} type={type} />
            )}
          </Suspense>
          
          <Suspense fallback={
            <RevenueChartSkeleton className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4" />
          }>
            {isLoading ? (
              <RevenueChartSkeleton className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4" />
            ) : (
              <OrdersChart orders={orders} type={type} />
            )}
          </Suspense>

          <Suspense fallback={
            <RevenueChartSkeleton className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5" />
          }>
            {isLoading ? (
              <RevenueChartSkeleton className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5" />
            ) : (
              <OrderStatusChart ordersByStatus={ordersByStatus} type={type} />
            )}
          </Suspense>

          <div className="col-span-12 h-full w-full xl:col-span-7">
            <Suspense fallback={<LatestInvoicesSkeleton />}>
              {isLoading ? (
                <LatestInvoicesSkeleton />
              ) : (
                <TopBuyersTable data={topBuyers} />
              )}
            </Suspense>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default AdminDashboard;
