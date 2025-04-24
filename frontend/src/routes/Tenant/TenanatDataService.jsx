export const fetchTenants = async () => {
  try {
    // In a real app, this would be an API call
    // Simulated API response
    return [
      {
        id: 1,
        name: "John Doe",
        roomNumber: "101",
        status: "Active",
        joinDate: "2025-01-15",
        rentAmount: "5000",
        contact: "9876543210"
      },
      {
        id: 2,
        name: "Jane Smith",
        roomNumber: "102",
        status: "Active",
        joinDate: "2025-02-10",
        rentAmount: "5500",
        contact: "9876543211"
      },
      {
        id: 3,
        name: "Robert Johnson",
        roomNumber: "103",
        status: "Inactive",
        joinDate: "2024-12-05",
        rentAmount: "4800",
        contact: "9876543212"
      },
      {
        id: 4,
        name: "Smith",
        roomNumber: "102",
        status: "Active",
        joinDate: "2025-02-10",
        rentAmount: "5500",
        contact: "9876543211"
      },
      {
        id: 5,
        name: "Johnson",
        roomNumber: "103",
        status: "Inactive",
        joinDate: "2024-12-05",
        rentAmount: "4800",
        contact: "9876543212"
      },
    ];
  } catch (error) {
    console.error("Error fetching tenants:", error);
    throw error;
  }
};

export const addTenant = async (tenant) => {
  try {
    // In a real app, this would be an API call
    // Simulated API response - just returning the tenant with an ID
    return {
      id: Date.now(), // Use timestamp as ID for simulation
      ...tenant,
    };
  } catch (error) {
    console.error("Error adding tenant:", error);
    throw error;
  }
};

export const updateTenant = async (id, tenant) => {
  try {
    // In a real app, this would be an API call
    // Just return the updated tenant for simulation
    return {
      id,
      ...tenant,
    };
  } catch (error) {
    console.error("Error updating tenant:", error);
    throw error;
  }
};

export const deleteTenant = async (id) => {
  try {
    // In a real app, this would be an API call
    // Just return success for simulation
    return { success: true };
  } catch (error) {
    console.error("Error deleting tenant:", error);
    throw error;
  }
};

export const getTenantById = async (id) => {
  try {
    // In a real app, this would be an API call
    // For simulation, we'll return a hardcoded tenant
    const tenants = await fetchTenants();
    return tenants.find(tenant => tenant.id === id) || null;
  } catch (error) {
    console.error("Error getting tenant:", error);
    throw error;
  }
};