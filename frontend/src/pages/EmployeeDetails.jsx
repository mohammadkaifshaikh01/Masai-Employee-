import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Pencil, ArrowLeft,} from 'lucide-react';
import axios from 'axios';

function EmployeeDetails() {
  const API_URL = "https://masai-employee-wikb.onrender.com";
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${API_URL}/em/single/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log(response.data.employee)
        setEmployee(response.data.employee);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch employee details');
        navigate('/');
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-700">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Employee Details</h2>
            <Link
              to={`/edit-employee/${id}`}
              className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50"
            >
              <Pencil className="h-5 w-5 mr-2" />
              Edit
            </Link>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <img
                src={employee.profileImage}
                alt={employee.name}
                className="h-48 w-48 rounded-full object-cover border-4 border-indigo-600"
              />
            </div>

            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{employee.name}</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                
                  <div>
                
                    <p className="text-sm text-gray-500">Position</p>
                    <p className="text-lg text-gray-800">{employee.position}</p>
                  </div>
                </div>

                <div className="flex items-center">
               
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg text-gray-800">{employee.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
               
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="text-lg text-gray-800">{employee.contactNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;