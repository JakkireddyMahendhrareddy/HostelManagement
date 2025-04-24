// FeesDataService.jsx
export const fetchFees = async () => {
  // This would be replaced with your actual API call
  return [
    {
      id: "1",
      tenantName: "John Doe",
      roomNumber: "101",
      joinDate: "2025-01-15",
      rentAmount: 5000,
      paidAmount: 4000,
      depositAmount: 1000,
      paymentStatus: "Due",
      nextDueDate: "2025-05-01",
      lastPaidDate: "2025-04-01",
      paymentMode: "UPI",
    },
    {
      id: "2",
      tenantName: "Anjali Sharma",
      roomNumber: "202",
      joinDate: "2025-02-10",
      rentAmount: 6000,
      paidAmount: 6000,
      depositAmount: 2000,
      paymentStatus: "Paid",
      nextDueDate: "2025-05-10",
      lastPaidDate: "2025-04-10",
      paymentMode: "Cash",
    },
    {
      id: "3",
      tenantName: "Ravi Teja",
      roomNumber: "303",
      joinDate: "2025-03-05",
      rentAmount: 5500,
      paidAmount: 0,
      depositAmount: 1500,
      paymentStatus: "Due",
      nextDueDate: "2025-04-05",
      lastPaidDate: "N/A",
      paymentMode: "Bank Transfer",
    },
    {
      id: "4",
      tenantName: "Sneha Reddy",
      roomNumber: "404",
      joinDate: "2025-01-20",
      rentAmount: 6200,
      paidAmount: 6200,
      depositAmount: 2500,
      paymentStatus: "Paid",
      nextDueDate: "2025-05-20",
      lastPaidDate: "2025-04-20",
      paymentMode: "UPI",
    },
  ];
};

export const addPayment = async (paymentData) => {
  // This would be replaced with your actual API call
  return {
    id: Date.now().toString(),
    ...paymentData,
  };
};

export const updatePayment = async (id, paymentData) => {
  // This would be replaced with your actual API call
  return {
    id,
    ...paymentData,
  };
};

export const deletePayment = async (id) => {
  // This would be replaced with your actual API call
  return true;
};
