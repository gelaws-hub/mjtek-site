"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ChartOne from "@/components/tailadmin/Charts/ChartOne";
import ChartTwo from "@/components/tailadmin/Charts/ChartTwo";
import TableOne from "@/components/tailadmin/Tables/TableOne";
import CardDataStats from "@/components/tailadmin/CardDataStats";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import { useRouter, useSearchParams } from "next/navigation";

const MapOne = dynamic(() => import("@/components/tailadmin/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(
  () => import("@/components/tailadmin/Charts/ChartThree"),
  {
    ssr: false,
  },
);

interface Sales {
  time: string;
  total_income: string;
}

interface Orders {
  time: string;
  total_orders: string;
}

interface OrdersByStatus {
  status: string;
  total_orders: string;
}

const AdminDashboard: React.FC = () => {
  const [sales, setSales] = useState<Sales[]>([
    { time: "Jan", total_income: "0" },
  ]);
  const [orders, setOrders] = useState<Orders[]>([
    { time: "Jan", total_orders: "0" },
  ]);

  const [ordersByStatus, setOrdersByStatus] = useState<OrdersByStatus[]>([
    { status: "finished", total_orders: "0" },
  ]);

  const [topBuyers, setTopBuyers] = useState<any[]>([]);

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
        setTopBuyers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopBuyers();
    fetchSales();
  }, [range, type]);

  const formatIDR = (value: string) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(value, 10));
  };

  const calculateRate = (current: number, previous: number) => {
    if (previous <= 0) {
      return "100%";
    }
    if (current && previous === 0) {
      return "0%";
    }
    return `${((current / previous) * 100 - 100).toFixed(2)} %`;
  };

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

  const translateStatus = (status: string) => {
    switch (status) {
      case "checking":
        return "Diperiksa";
      case "processing":
        return "Diproses";
      case "shipping":
        return "Dikirim";
      case "dispute":
        return "Dikomplain";
      case "finished":
        return "Selesai";
      default:
        return status;
    }
  };

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
          <CardDataStats
            className="col-span-1 lg:col-span-2 xl:col-span-3"
            title={`${sales[range - 1]?.time}`}
            total={`${formatIDR(sales[range - 1]?.total_income || "0")}`}
            rate={calculateRate(
              Number(sales[range - 1]?.total_income) || 0,
              Number(sales[range - 2]?.total_income) || 0,
            )}
            levelUp={
              Number(sales[range - 1]?.total_income) >
              Number(sales[range - 2]?.total_income)
            }
            levelDown={
              Number(sales[range - 1]?.total_income) <
              Number(sales[range - 2]?.total_income)
            }
          >
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z"
                fill=""
              />
              <path
                d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z"
                fill=""
              />
              <path
                d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z"
                fill=""
              />
            </svg>
          </CardDataStats>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartOne
            title={`Total Pendapatan ${formatIndoType(type)}an (juta)`}
            sales={sales}
          />
          <ChartTwo
            orders={orders.map((order) => ({
              category: order.time,
              data: order.total_orders,
            }))}
            title={`Pesanan selesai ${formatIndoType(type)} ini`}
          />
          <ChartThree
            title={`Status pesanan ${formatIndoType(type)}an`}
            ordersByStatus={ordersByStatus.map((order) => ({
              category: translateStatus(order.status),
              data: order.total_orders,
            }))}
            rawCategories={ordersByStatus.map((order) => order.status)}
            urlPrefix="/admin/transactions?status="
          />
          {/* <MapOne /> */}
          <div className="col-span-12 h-full xl:col-span-7">
            <TableOne
              title="Pembeli teratas"
              data={topBuyers}
              className="h-full"
            />
          </div>
          {/* <ChatCard /> */}
        </div>
      </DefaultLayout>
    </>
  );
};

export default AdminDashboard;
