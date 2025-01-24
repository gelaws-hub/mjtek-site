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
