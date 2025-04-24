import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import FeesTable from "./FeesTable";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import FeesFilters from "./FeesFilters";
import FeesModal from "./FeesModal";
import FeesDetailsModal from "./FeesDetailsModal";
import * as feesDataService from "./FeesDataService.jsx";

const FeesManagement = () => {
  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    status: "",
    rentMin: "",
    rentMax: "",
    paidMin: "",
    paidMax: "",
    paymentMode: "",
    dueFrom: "",
    dueTo: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentFee, setCurrentFee] = useState(null);

  const [formData, setFormData] = useState({
    tenantName: "",
    roomNumber: "",
    joinDate: "",
    rentAmount: "",
    paidAmount: "",
    depositAmount: "",
    paymentStatus: "Due",
    nextDueDate: "",
    lastPaidDate: "",
    paymentMode: "",
  });

  useEffect(() => {
    const loadFees = async () => {
      try {
        const data = await feesDataService.fetchFees();
        setFees(data);
        setFilteredFees(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading fees:", error);
        setIsLoading(false);
      }
    };
    loadFees();
  }, []);

  useEffect(() => {
    filterFees();
  }, [searchTerm, activeFilters, fees]);

  const filterFees = () => {
    let results = fees.filter((fee) => {
      const matchesSearch =
        searchTerm === "" ||
        fee.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        activeFilters.status === "" || fee.paymentStatus === activeFilters.status;

      const matchesPaymentMode =
        activeFilters.paymentMode === "" || fee.paymentMode === activeFilters.paymentMode;

      const matchesRentMin =
        activeFilters.rentMin === "" ||
        parseInt(fee.rentAmount) >= parseInt(activeFilters.rentMin);

      const matchesRentMax =
        activeFilters.rentMax === "" ||
        parseInt(fee.rentAmount) <= parseInt(activeFilters.rentMax);

      const matchesPaidMin =
        activeFilters.paidMin === "" ||
        parseInt(fee.paidAmount) >= parseInt(activeFilters.paidMin);

      const matchesPaidMax =
        activeFilters.paidMax === "" ||
        parseInt(fee.paidAmount) <= parseInt(activeFilters.paidMax);

      const dueDate = new Date(fee.nextDueDate);
      const matchesDueFrom =
        activeFilters.dueFrom === "" ||
        dueDate >= new Date(activeFilters.dueFrom);

      const matchesDueTo =
        activeFilters.dueTo === "" ||
        dueDate <= new Date(activeFilters.dueTo);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentMode &&
        matchesRentMin &&
        matchesRentMax &&
        matchesPaidMin &&
        matchesPaidMax &&
        matchesDueFrom &&
        matchesDueTo
      );
    });

    setFilteredFees(results);
    setCurrentPage(1);
  };

  const indexOfLastFee = currentPage * itemsPerPage;
  const indexOfFirstFee = indexOfLastFee - itemsPerPage;
  const currentFees = filteredFees.slice(indexOfFirstFee, indexOfLastFee);
  const totalPages = Math.ceil(filteredFees.length / itemsPerPage);

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

  const handleEdit = (fee) => {
    setCurrentFee(fee);
    setFormData({ ...fee });
    setShowEditModal(true);
  };

  const handleViewDetails = (fee) => {
    setCurrentFee(fee);
    setShowDetailsModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await feesDataService.deleteFee(id);
      const updatedFees = fees.filter((fee) => fee.id !== id);
      setFees(updatedFees);
      setFilteredFees(updatedFees);
      alert("Fee record deleted successfully!");
    } catch (error) {
      console.error("Error deleting fee:", error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFee = await feesDataService.addFee(formData);
      setFees([...fees, newFee]);
      setFilteredFees([...filteredFees, newFee]);
      setShowAddModal(false);
      resetForm();
      alert("Fee added successfully!");
    } catch (error) {
      console.error("Error adding fee:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFee = await feesDataService.updateFee(currentFee.id, formData);
      const updatedFees = fees.map((fee) =>
        fee.id === currentFee.id ? updatedFee : fee
      );
      setFees(updatedFees);
      setFilteredFees(updatedFees);
      setShowEditModal(false);
      setCurrentFee(null);
      resetForm();
      alert("Fee updated successfully!");
    } catch (error) {
      console.error("Error updating fee:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      tenantName: "",
      roomNumber: "",
      joinDate: "",
      rentAmount: "",
      paidAmount: "",
      depositAmount: "",
      paymentStatus: "Due",
      nextDueDate: "",
      lastPaidDate: "",
      paymentMode: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Fees List</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div className="flex space-x-2 mt-4 md:mt-0">
          <FeesFilters onFilterChange={handleFilterChange} />
          {/* <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center space-x-2 hover:bg-green-700"
            onClick={() => setShowAddModal(true)}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Fee</span>
          </button> */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <FeesTable
          fees={currentFees}
          isLoading={isLoading}
          indexOfFirstFee={indexOfFirstFee}
          onEdit={handleEdit}
          onViewDetails={handleViewDetails}
          onDelete={handleDelete}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {showAddModal && (
        <FeesModal
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleAddSubmit}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        />
      )}

      {showEditModal && (
        <FeesModal
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleEditSubmit}
          onClose={() => {
            setShowEditModal(false);
            resetForm();
          }}
        />
      )}

      {showDetailsModal && (
        <FeesDetailsModal
          fee={currentFee}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default FeesManagement;
