import React, { useState } from "react";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  className?: string;
}

const CurrencyInput = ({
  value,
  onChange,
  currency = "IDR",
  className = "",
}: CurrencyInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const currencyStringToNumber = (currencyString: string) => {
    const userLocale = navigator.language || "en-US";
    const cleanedString = currencyString
      .trim()
      .replace(/^[^\d-]+/, "")
      .replace(/[^\d.,\-]+$/, "");

    const numberFormat = new Intl.NumberFormat(userLocale);
    const formatParts = numberFormat.formatToParts(1234.5);
    const decimalSeparator =
      formatParts.find((part) => part.type === "decimal")?.value || ".";
    const groupSeparator =
      formatParts.find((part) => part.type === "group")?.value || ",";

    const normalizedString = cleanedString
      .replace(new RegExp(`\\${groupSeparator}`, "g"), "")
      .replace(decimalSeparator, ".");

    const number = parseFloat(normalizedString);
    if (isNaN(number)) {
      return 0;
    }
    return number;
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    const rawValue = currencyStringToNumber(e.target.value);
    e.target.value = rawValue.toString();
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    const rawValue = currencyStringToNumber(e.target.value);
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(rawValue);
    e.target.value = formattedValue;
    onChange(rawValue);
  };

  const handleChange = (e: any) => {
    const rawValue = currencyStringToNumber(e.target.value);
    onChange(rawValue);
  };

  return (
    <input
      type="text"
      value={
        isFocused
          ? value.toString()
          : new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency,
              maximumFractionDigits: 2,
            }).format(value)
      }
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      className={className}
    />
  );
};

export default CurrencyInput;
