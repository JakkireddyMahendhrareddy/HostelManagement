import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import TenantTable from "./TenantTable";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import TenantFilters from "./TenantFilters";
import TenantModal from "./TenantModal";
import TenantDetailsModal from "./TenantDetailsModal";
import * as tenantDataService from "./TenanatDataService.jsx";

const TenantManagement = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    status: "",
    rentMin: "",
    rentMax: "",
    joinDateFrom: "",
    joinDateTo: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    roomNumber: "",
    status: "Active",
    joinDate: "",
    rentAmount: "",
    contact: "",
  });

  useEffect(() => {
    const loadTenants = async () => {
      try {
        const data = await tenantDataService.fetchTenants();
        setTenants(data);
        setFilteredTenants(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading tenants:", error);
        setIsLoading(false);
      }
    };
    loadTenants();
  }, []);

  useEffect(() => {
    filterTenants();
  }, [searchTerm, activeFilters, tenants]);

  const filterTenants = () => {
    let results = tenants.filter((tenant) => {
      const matchesSearch =
        searchTerm === "" ||
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tenant.contact &&
          tenant.contact.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        activeFilters.status === "" || tenant.status === activeFilters.status;

      const matchesRentMin =
        activeFilters.rentMin === "" ||
        parseInt(tenant.rentAmount) >= parseInt(activeFilters.rentMin);

      const matchesRentMax =
        activeFilters.rentMax === "" ||
        parseInt(tenant.rentAmount) <= parseInt(activeFilters.rentMax);

      const tenantDate = new Date(tenant.joinDate);

      const matchesJoinDateFrom =
        activeFilters.joinDateFrom === "" ||
        tenantDate >= new Date(activeFilters.joinDateFrom);

      const matchesJoinDateTo =
        activeFilters.joinDateTo === "" ||
        tenantDate <= new Date(activeFilters.joinDateTo);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRentMin &&
        matchesRentMax &&
        matchesJoinDateFrom &&
        matchesJoinDateTo
      );
    });

    setFilteredTenants(results);
    setCurrentPage(1);
  };

  const indexOfLastTenant = currentPage * itemsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - itemsPerPage;
  const currentTenants = filteredTenants.slice(
    indexOfFirstTenant,
    indexOfLastTenant
  );
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (tenant) => {
    setCurrentTenant(tenant);
    setFormData({
      name: tenant.name,
      roomNumber: tenant.roomNumber,
      status: tenant.status,
      joinDate: tenant.joinDate,
      rentAmount: tenant.rentAmount,
      contact: tenant.contact || "",
    });
    setShowEditModal(true);
  };

  const handleViewDetails = (tenant) => {
    setCurrentTenant(tenant);
    setShowDetailsModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await tenantDataService.deleteTenant(id);
      setTenants(tenants.filter((tenant) => tenant.id !== id));
      setFilteredTenants(filteredTenants.filter((tenant) => tenant.id !== id));
      alert("Tenant deleted successfully!");
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTenant = await tenantDataService.addTenant(formData);
      setTenants([...tenants, newTenant]);
      setFilteredTenants([...filteredTenants, newTenant]);
      setShowAddModal(false);
      resetForm();
      alert("Tenant added successfully!");
    } catch (error) {
      console.error("Error adding tenant:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTenant = await tenantDataService.updateTenant(
        currentTenant.id,
        formData
      );

      const updatedTenants = tenants.map((tenant) =>
        tenant.id === currentTenant.id ? updatedTenant : tenant
      );

      setTenants(updatedTenants);
      setFilteredTenants(
        filteredTenants.map((tenant) =>
          tenant.id === currentTenant.id ? updatedTenant : tenant
        )
      );

      setShowEditModal(false);
      setCurrentTenant(null);
      resetForm();
      alert("Tenant updated successfully!");
    } catch (error) {
      console.error("Error updating tenant:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      roomNumber: "",
      status: "Active",
      joinDate: "",
      rentAmount: "",
      contact: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Tenant List</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <div className="flex space-x-2 mt-4 md:mt-0">
          <TenantFilters onFilterChange={handleFilterChange} />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-700"
            onClick={() => setShowAddModal(true)}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create New</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <TenantTable
          tenants={currentTenants}
          isLoading={isLoading}
          indexOfFirstTenant={indexOfFirstTenant}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {showAddModal && (
        <TenantModal
          title="Add New Tenant"
          formData={formData}
          onInputChange={handleInputChange}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          onSubmit={handleAddSubmit}
        />
      )}

      {showEditModal && currentTenant && (
        <TenantModal
          title="Edit Tenant"
          formData={formData}
          onInputChange={handleInputChange}
          onClose={() => {
            setShowEditModal(false);
            setCurrentTenant(null);
            resetForm();
          }}
          onSubmit={handleEditSubmit}
        />
      )}

      {showDetailsModal && currentTenant && (
        <TenantDetailsModal
          tenant={currentTenant}
          onClose={() => {
            setShowDetailsModal(false);
            setCurrentTenant(null);
          }}
        />
      )}
    </div>
  );
};

export default TenantManagement;
