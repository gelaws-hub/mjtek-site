export const transactions = [
  {
    id: "01941d87-bc11-7cc5-8105-688283b11d8b",
    user: {
      id: "fffaa915-2db3-4030-af29-f8a535c426ff",
      name: "Asdf123",
      email: "asdf@asdf",
      address: "ASDF",
      phone_number: "01312134561354",
    },
    total_items: 3,
    total_price: "8625000.02",
    start_time: "2024-12-31T16:23:42.355Z",
    end_time: "2025-01-02T06:08:24.270Z",
    status: "Cancelled",
    products: [
      {
        product_id: "3",
        product_name: "Gigabyte H610M K DDR4 Motherboard Intel LGA 1700",
        quantity: 1,
        price: 1225000,
        total_price: 1225000,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/4/23/296f417a-dfa3-4a71-975d-d1b707fc7707.png",
      },
      {
        product_id: "2",
        product_name: "Updated1 Intel Core I5 12400F 12th Gen Processor",
        quantity: 1,
        price: 2250000,
        total_price: 2250000,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/16/fbb341ce-1f46-4d5f-928f-0437e9281990.png",
      },
      {
        product_id: "4",
        product_name:
          "VGA Card Gigabyte GeForce RTX 3060 WINDFORCE OC 12G - 12GB GDDR6",
        quantity: 1,
        price: 5150000.02,
        total_price: 5150000.02,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/11/101b7487-a1fc-4280-aedc-5567d871b698.jpg",
      },
      {
        product_id: "4",
        product_name:
          "VGA Card Gigabyte GeForce RTX 3060 WINDFORCE OC 12G - 12GB GDDR6",
        quantity: 1,
        price: 5150000.02,
        total_price: 5150000.02,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/11/d88f0673-d4b8-4731-a2c6-5ab0230a01db.jpg",
      },
    ],
  },
  {
    id: "019420d6-efbd-777a-8cce-8d3935d4cceb",
    user: {
      id: "fffaa915-2db3-4030-af29-f8a535c426ff",
      name: "Asdf123",
      email: "asdf@asdf",
      address: "ASDF",
      phone_number: "01312134561354",
    },
    total_items: 8,
    total_price: "19190000.04",
    start_time: "2025-01-01T07:49:04.612Z",
    end_time: null,
    status: "Menunggu konfirmasi ketersediaan dari Admin",
    products: [
      {
        product_id: "2",
        product_name: "Updated1 Intel Core I5 12400F 12th Gen Processor",
        quantity: 2,
        price: 2250000,
        total_price: 4500000,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/16/fbb341ce-1f46-4d5f-928f-0437e9281990.png",
      },
      {
        product_id: "3",
        product_name: "Gigabyte H610M K DDR4 Motherboard Intel LGA 1700",
        quantity: 2,
        price: 1225000,
        total_price: 2450000,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/4/23/296f417a-dfa3-4a71-975d-d1b707fc7707.png",
      },
      {
        product_id: "4",
        product_name:
          "VGA Card Gigabyte GeForce RTX 3060 WINDFORCE OC 12G - 12GB GDDR6",
        quantity: 2,
        price: 5150000.02,
        total_price: 10300000.04,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/11/101b7487-a1fc-4280-aedc-5567d871b698.jpg",
      },
      {
        product_id: "4",
        product_name:
          "VGA Card Gigabyte GeForce RTX 3060 WINDFORCE OC 12G - 12GB GDDR6",
        quantity: 2,
        price: 5150000.02,
        total_price: 10300000.04,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/11/d88f0673-d4b8-4731-a2c6-5ab0230a01db.jpg",
      },
      {
        product_id: "7",
        product_name: "RAM G.Skill Trident Z 16GB DDR4 Kit 3600MHz RGB Effects",
        quantity: 2,
        price: 970000,
        total_price: 1940000,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/2/22/0a887c07-9adc-43c2-a40b-832970903953.png",
      },
      {
        product_id: "7",
        product_name: "RAM G.Skill Trident Z 16GB DDR4 Kit 3600MHz RGB Effects",
        quantity: 2,
        price: 970000,
        total_price: 1940000,
        media_source:
          "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/4/29/d1769bee-7251-4280-988d-84051f699d68.jpg",
      },
    ],
  },
];

export const fetchTransactions = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/transaction`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  const data = await response.json()
  if(response.ok) {
    return data.transactions
  } else {
    throw new Error(data.message || data.error || 'Failed to fetch data')
  }
}

export const fetchTransactionStatuses = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/transaction-status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  const data = await response.json()
  if(response.ok) {
    return data.transactionStatuses;
  } else {
    throw new Error(data.message || data.error || 'Failed to fetch data')
  }
}
