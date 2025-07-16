import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    designationList: []
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
    
    addDesignation: (state, action) =>{
      state.designationList.push(action.payload);
    }

  },
});

export const { addEmployee , addDesignation} = employeeSlice.actions;
export default employeeSlice.reducer;
