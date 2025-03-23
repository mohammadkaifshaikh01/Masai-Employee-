import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../store/slices/employeeSlice';
import { toast } from 'react-toastify';

import { TiEye } from "react-icons/ti";

import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

function Dashboard() {
  const dispatch = useDispatch();
  const { list: employees, loading, totalPages, currentPage } = useSelector((state) => state.employees);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    loadEmployees();
  }, [dispatch, currentPage, search, sortBy, order]);

  const loadEmployees = () => {
    dispatch(fetchEmployees({ page: currentPage, search, sortBy, order }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await dispatch(deleteEmployee(id)).unwrap();
        toast.success('Employee deleted successfully');
        loadEmployees();
      } catch (err) {
        toast.error(err.message || 'Failed to delete employee');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Masai Employees ..</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
     
          </div>
          <Link
            to="/add-employee"
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
        
       
            Add Employee
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={employee.profileImage}
                        alt={employee.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.contactNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.createdAt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.updatedAt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link
                      to={`/employee/${employee._id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {/* <Eye /> */}
                      <TiEye  className="h-5 w-5" />
                    </Link>
                    <Link
                      to={`/edit-employee/${employee._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                
                      <FaEdit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                    
                      <FaDeleteLeft className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className=" h-8 w-50  ">
            Employee Loading......
          </div>
        </div>
      )}

      {!loading && employees.length === 0 && (
        <div className="text-center mt-8 text-gray-500">No employees found</div>
      )}
    </div>
  );
}

export default Dashboard;