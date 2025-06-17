import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Plus, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import NoHostelMessage from "../NoHostelMessage";
import ConfirmModal from "../ConfirmModal";
import { backendUrl, toastNoficationSettings } from "../../utils/utils";
import MaintenanceTable from "./MaintenanceTable";
import MaintenanceFormModal from "./MaintenanceFormModal";
import MaintenanceDetailsModal from "./MaintenanceDetailsModal";

const MaintenanceInfo = () => {
  // API URLs
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const getAllIssuesUrl = `${backendUrl}/api/maintenance/`;
  const createIssueUrl = `${backendUrl}/api/maintenance`;
  const updateIssueUrl = `${backendUrl}/api/maintenance/edit`;
  const deleteIssueUrl = `${backendUrl}/api/maintenance/delete`;

  // State variables
  const [maintenanceIssues, setMaintenanceIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hostel, setHostel] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueToDelete, setIssueToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New maintenance issue form state
  const [newIssue, setNewIssue] = useState({
    roomNo: "",
    issue: "",
    status: "Pending",
    remarks: "",
    priority: "Medium",
    requestedBy: "",
    assignedTo: "",
    createdDate: new Date().toISOString().split("T")[0],
  });

  // Fetch hostel details
  const fetchHostel = async () => {
    try {
      setLoading(true);
      const response = await fetch(getHostelUrl, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setHostel(data);
          fetchMaintenanceIssues();
        } else {
          setHostel(null);
        }
      }
    } catch (error) {
      toast.warning("Something Went Wrong", toastNoficationSettings);
    } finally {
      setLoading(false);
    }
  };

  // Fetch maintenance issues data from API
  const fetchMaintenanceIssues = async () => {
    setLoading(true);
    try {
      const response = await axios.get(getAllIssuesUrl, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("Maintenance issues data:", data);

        if (!data || data.length === 0) {
          toast.info("No maintenance issues found.", toastNoficationSettings);
          setMaintenanceIssues([]);
          return;
        }

        setMaintenanceIssues(data);
      } else {
        toast.warning(
          "Failed to fetch maintenance issues",
          toastNoficationSettings
        );
        setMaintenanceIssues([]);
      }
    } catch (error) {
      console.error("Error fetching maintenance issues:", error);
      toast.error(
        "Something went wrong while fetching maintenance issues",
        toastNoficationSettings
      );
      setMaintenanceIssues([]);
    } finally {
      setLoading(false);
    }
  };

  const createMaintenanceIssue = async (issueData) => {
    setLoading(true);
    try {
      // Make sure we're sending the correct data format
      const cleanedIssueData = {
        roomNo: issueData.roomNo?.trim(),
        issue: issueData.issue?.trim(),
        status: issueData.status || "Pending",
        remarks: issueData.remarks?.trim() || "",
        priority: issueData.priority || "Medium",
        requestedBy: issueData.requestedBy?.trim(),
        assignedTo: issueData.assignedTo?.trim() || "",
        createdDate:
          issueData.createdDate || new Date().toISOString().split("T")[0],
      };

      console.log("Sending data to server:", cleanedIssueData);

      const response = await axios.post(createIssueUrl, cleanedIssueData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server response:", response);

      if (response.status >= 200 && response.status < 300) {
        toast.success(
          "Maintenance issue added successfully",
          toastNoficationSettings
        );
        await fetchMaintenanceIssues(); // refresh list after create
        return true;
      } else {
        const errorData = response.data;
        toast.error(
          errorData.message || "Failed to add maintenance issue",
          toastNoficationSettings
        );
        return false;
      }
    } catch (error) {
      console.error("Error creating maintenance issue:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);

        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Failed to add maintenance issue";
        toast.error(errorMessage, toastNoficationSettings);
      } else if (error.request) {
        console.error("Error request:", error.request);
        toast.error(
          "No response from server. Please try again later.",
          toastNoficationSettings
        );
      } else {
        toast.error(
          `Error: ${
            error.message ||
            "Something went wrong while adding maintenance issue"
          }`,
          toastNoficationSettings
        );
      }

      return false;
    } finally {
      setLoading(false);
    }
  };
  // Update maintenance issue
  const updateMaintenanceIssue = async (id, updatedIssueData) => {
    setLoading(true);
    try {
      // Make sure we're sending the correct data format
      const cleanedIssueData = {
        roomNo: updatedIssueData.roomNo?.trim(),
        issue: updatedIssueData.issue?.trim(),
        status: updatedIssueData.status || "Pending",
        remarks: updatedIssueData.remarks?.trim() || "",
        priority: updatedIssueData.priority || "Medium",
        requestedBy: updatedIssueData.requestedBy?.trim(),
        assignedTo: updatedIssueData.assignedTo?.trim() || "",
        createdDate:
          updatedIssueData.createdDate ||
          new Date().toISOString().split("T")[0],
      };

      console.log(`Updating issue with ID: ${id}`);
      console.log("Sending update data to server:", cleanedIssueData);

      const response = await axios.put(
        `${updateIssueUrl}/${id}`,
        cleanedIssueData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response);

      if (response.status >= 200 && response.status < 300) {
        toast.success(
          "Maintenance issue updated successfully",
          toastNoficationSettings
        );
        await fetchMaintenanceIssues(); // refresh after update
        return true;
      } else {
        const errorData = response.data;
        toast.error(
          errorData.message || "Failed to update maintenance issue",
          toastNoficationSettings
        );
        return false;
      }
    } catch (error) {
      console.error("Error updating maintenance issue:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);

        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Failed to update maintenance issue";
        toast.error(errorMessage, toastNoficationSettings);
      } else if (error.request) {
        console.error("Error request:", error.request);
        toast.error(
          "No response from server. Please try again later.",
          toastNoficationSettings
        );
      } else {
        toast.error(
          `Error: ${
            error.message ||
            "Something went wrong while updating maintenance issue"
          }`,
          toastNoficationSettings
        );
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateMaintenanceStatus = async (id, status) => {
    setLoading(true);
    try {
      console.log(`Updating status for issue ID: ${id} to ${status}`);

      const response = await axios.patch(
        `${backendUrl}/api/maintenance/${id}/status`,
        { status },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Status update response:", response);

      if (response.status >= 200 && response.status < 300) {
        toast.success(
          `Status updated to ${status} successfully`,
          toastNoficationSettings
        );
        await fetchMaintenanceIssues(); // refresh after update
        return true;
      } else {
        const errorData = response.data;
        toast.error(
          errorData.message || "Failed to update status",
          toastNoficationSettings
        );
        return false;
      }
    } catch (error) {
      console.error("Error updating maintenance status:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        const errorMessage =
          error.response.data?.message || "Failed to update status";
        toast.error(errorMessage, toastNoficationSettings);
      } else {
        toast.error(
          "Something went wrong while updating status",
          toastNoficationSettings
        );
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to assign maintenance to staff
  const assignMaintenanceToStaff = async (id, assignedTo) => {
    setLoading(true);
    try {
      console.log(`Assigning issue ID: ${id} to ${assignedTo}`);

      const response = await axios.patch(
        `${backendUrl}/api/maintenance/${id}/assign`,
        { assignedTo },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Assignment response:", response);

      if (response.status >= 200 && response.status < 300) {
        toast.success(
          `Issue assigned to ${assignedTo} successfully`,
          toastNoficationSettings
        );
        await fetchMaintenanceIssues(); // refresh after update
        return true;
      } else {
        const errorData = response.data;
        toast.error(
          errorData.message || "Failed to assign maintenance issue",
          toastNoficationSettings
        );
        return false;
      }
    } catch (error) {
      console.error("Error assigning maintenance:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        const errorMessage =
          error.response.data?.message || "Failed to assign maintenance issue";
        toast.error(errorMessage, toastNoficationSettings);
      } else {
        toast.error(
          "Something went wrong while assigning maintenance issue",
          toastNoficationSettings
        );
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete maintenance issue
  const deleteMaintenanceIssue = async () => {
    if (!issueToDelete) {
      console.error("No issue ID to delete");
      toast.error(
        "Error: No issue selected for deletion",
        toastNoficationSettings
      );
      setShowConfirmModal(false);
      return;
    }

    const idToDelete = issueToDelete;
    console.log("Attempting to delete issue with ID:", idToDelete);

    try {
      const deleteUrl = `${deleteIssueUrl}/${idToDelete}`;
      console.log("Delete URL:", deleteUrl);

      const response = await axios.delete(deleteUrl, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Delete successful, response:", response);
      toast.success(
        "Maintenance issue deleted successfully",
        toastNoficationSettings
      );
      await fetchMaintenanceIssues();
    } catch (error) {
      console.error("Error deleting maintenance issue:", error);

      if (error.response) {
        console.error("Error response:", error.response);
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);

        if (error.response.status === 404) {
          toast.error(
            "Issue not found. It may have been deleted already.",
            toastNoficationSettings
          );
          await fetchMaintenanceIssues();
        } else {
          const errorMessage =
            error.response.data &&
            (error.response.data.message ||
              error.response.data.error ||
              JSON.stringify(error.response.data))
              ? error.response.data.message ||
                error.response.data.error ||
                JSON.stringify(error.response.data)
              : "Server error";

          toast.error(
            `Failed to delete: ${errorMessage}`,
            toastNoficationSettings
          );
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        toast.error(
          "Network error: No response from server",
          toastNoficationSettings
        );
      } else {
        toast.error(`Error: ${error.message}`, toastNoficationSettings);
      }
    } finally {
      setShowConfirmModal(false);
      setIssueToDelete(null);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchHostel();
  }, []);

  // Handle form input changes
  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    setNewIssue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};

    // Basic validation
    if (!newIssue.roomNo?.trim()) {
      errors.roomNo = "Room number is required";
    }

    if (!newIssue.issue?.trim()) {
      errors.issue = "Issue description is required";
    }

    if (!newIssue.status?.trim()) {
      errors.status = "Status is required";
    }

    if (!newIssue.priority?.trim()) {
      errors.priority = "Priority is required";
    }

    if (!newIssue.requestedBy?.trim()) {
      errors.requestedBy = "Requester name is required";
    }

    if (!newIssue.createdDate) {
      errors.createdDate = "Request date is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit form with validation
  const submitForm = async (e) => {
    if (e) e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        let success;
        if (isEditing && selectedIssue) {
          success = await updateMaintenanceIssue(selectedIssue._id, newIssue);
        } else {
          success = await createMaintenanceIssue(newIssue);
        }

        if (success) {
          // Reset form and close modal
          resetForm();
          setShowFormModal(false);
        }
      } catch (error) {
        console.error("Error submitting maintenance form:", error);
        toast.error("Error saving maintenance information. Please try again.");

        setFormErrors({
          general:
            "There was an error saving the maintenance issue. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.warning("Please correct the errors in the form");
    }
  };

  // Reset form after submission or cancel
  const resetForm = () => {
    setNewIssue({
      roomNo: "",
      issue: "",
      status: "Pending",
      remarks: "",
      priority: "Medium",
      requestedBy: "",
      assignedTo: "",
      createdDate: new Date().toISOString().split("T")[0],
    });
    setFormErrors({});
    setIsEditing(false);
    setSelectedIssue(null);
  };

  // Handle view details button click
  const handleViewClick = (issue) => {
    setSelectedIssue(issue);
    setShowDetailsModal(true);
  };

  // Handle edit button click
  const handleEditClick = (issue) => {
    setSelectedIssue(issue);

    // Format date properly
    const formattedDate = issue.createdDate
      ? new Date(issue.createdDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    // Format the issue data for the form
    setNewIssue({
      roomNo: issue.roomNo || "",
      issue: issue.issue || "",
      status: issue.status || "Pending",
      remarks: issue.remarks || "",
      priority: issue.priority || "Medium",
      requestedBy: issue.requestedBy || "",
      assignedTo: issue.assignedTo || "",
      createdDate: formattedDate,
    });

    setIsEditing(true);
    setShowFormModal(true);
  };

  // Handle delete button click
  const handleDeleteClick = (issueId) => {
    setIssueToDelete(issueId);
    setShowConfirmModal(true);
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-start pt-0">
      <div className="w-full max-w-7xl px-4 pt-4">
        {loading && maintenanceIssues.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : !hostel || Object.keys(hostel).length === 0 ? (
          <NoHostelMessage />
        ) : (
          <div className="min-h-screen bg-white shadow-lg p-4 sm:p-6 md:p-8 rounded-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 drop-shadow-md">
                Hostel Maintenance Records
              </h1>
              <button
                onClick={() => {
                  resetForm();
                  setShowFormModal(true);
                }}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 sm:py-3 sm:px-5 rounded-md shadow-md transition-colors cursor-pointer text-sm sm:text-base"
              >
                <Plus size={20} />
                Report Issue
              </button>
            </div>

            {/* Empty State or Maintenance Table */}
            {maintenanceIssues.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-base sm:text-lg font-medium">
                  No maintenance issues found. Report a new issue to get
                  started.
                </p>
              </div>
            ) : (
              <MaintenanceTable
                issues={maintenanceIssues}
                handleDeleteClick={handleDeleteClick}
                loading={loading}
                handleEditClick={handleEditClick}
                handleViewClick={handleViewClick}
              />
            )}

            {/* Modals */}
            {showFormModal && (
              <MaintenanceFormModal
                setShowFormModal={setShowFormModal}
                newIssue={newIssue}
                handleIssueChange={handleIssueChange}
                handleSubmit={submitForm}
                isEditing={isEditing}
                resetForm={resetForm}
                formErrors={formErrors}
                isSubmitting={isSubmitting}
              />
            )}

            {showDetailsModal && (
              <MaintenanceDetailsModal
                issue={selectedIssue}
                setShowDetailsModal={setShowDetailsModal}
              />
            )}

            {showConfirmModal && (
              <ConfirmModal
                confirmType="maintenance"
                confirmDelete={deleteMaintenanceIssue}
                setShowConfirmModal={setShowConfirmModal}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceInfo;
