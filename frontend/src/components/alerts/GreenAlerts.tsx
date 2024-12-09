'use client';
import React, { useEffect } from "react";

interface GreenAlertsProps {
  title?: string;
  description?: string;
  onClose?: () => void;
  timeout?: number;
}

export default function GreenAlerts({
  title = "",
  description = "",
  onClose,
  timeout = 3000,
}: GreenAlertsProps) {
  useEffect(() => {
    if (timeout && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout, onClose]);

  return (
    <div className="fixed bottom-4 right-4 flex w-[30vw] border-l-6 border-[#34D399] bg-[#fcfcfc] bg-opacity-[80%] dark:bg-opacity-90 px-7 py-8 shadow-md dark:bg-[#1B1B24]  md:p-9">
      <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
            fill="white"
            stroke="white"
          ></path>
        </svg>
      </div>
      <div className="w-full">
        <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399]">
          {title}
        </h5>
        <p className="text-base leading-relaxed text-body">{description}</p>
      </div>
      {onClose && (
        <button
          className="absolute right-4 top-4 text-black hover:opacity-75 dark:text-[#34D399]"
          onClick={onClose}
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
}
