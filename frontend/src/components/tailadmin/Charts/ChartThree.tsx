"use client";

import { cn } from "@/lib/utils";
import { ApexOptions } from "apexcharts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartThreeState {
  series: number[];
}

interface OrdersByStatus {
  category: string;
  data: string;
}

function ChartThree({
  ordersByStatus,
  title = "",
  urlPrefix = "",
  rawCategories,
  className,
}: {
  ordersByStatus: OrdersByStatus[];
  title?: string;
  urlPrefix?: string;
  rawCategories?: string[];
  className?: string;
}) {
  const series = ordersByStatus.map((order) =>
    parseInt(order.data, 10),
  );
  const router = useRouter();

  const totalSeries = series.reduce((acc, curr) => acc + curr, 0);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
      ...(rawCategories && {
        events: {
          dataPointSelection: function (event, chartContext, config) {
            const selectedSliceIndex = config.dataPointIndex; // Get the clicked slice index
            const urls = rawCategories.map((category: string) =>
              `${urlPrefix}${category}`
            );

            // Redirect to the corresponding URL based on the clicked slice
            if (urls[selectedSliceIndex]) {
              router.push(urls[selectedSliceIndex]);
            }
          },
          dataPointMouseEnter: function (event) {
            event.target.style.cursor = "pointer";
          },
        },
      }),
    },
    colors: ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#00509d"],
    labels: ordersByStatus.map((order) => order.category),
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className={cn("col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5 relative", className)}>
      <Link href={urlPrefix} className="z-[9] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center justify-center">{totalSeries}</Link>
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          {series.every((item) => item === 0) ? (
            <span className="text-center text-lg font-semibold text-black dark:text-white h-full min-h-[320px] flex items-center justify-center">
              Tidak ada data
            </span>
          ) : (
            <ReactApexChart options={options} series={series} type="donut" />
          )}
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-start gap-y-3">
        {ordersByStatus.map((order, index) => (
          <div className="w-1/3 px-4" key={index}>
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-full max-w-3 rounded-full"
                style={{
                  backgroundColor:
                    options.colors![index % options.colors!.length],
                }}
              ></span>
              <p className="text-sm font-medium text-black dark:text-white truncate">
                {order.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartThree;
