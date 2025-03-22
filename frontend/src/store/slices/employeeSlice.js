import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async ({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    order = "desc",
  }) => {
    const response = await axios.get(
      `${API_URL}/em/all?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log(response.data)
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData) => {
    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      formData.append(key, employeeData[key]);
    });

    const response = await axios.post(`${API_URL}/em/add`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }) => {
    const response = await axios.patch(`${API_URL}/em/update/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    await axios.delete(`${API_URL}/em/remove/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    totalPages: 0,
    currentPage: 1,
    totalEmployees: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.employees;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalEmployees = action.payload.totalEmployees;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (employee) => employee._id !== action.payload
        );
      });
  },
});

export const { clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
