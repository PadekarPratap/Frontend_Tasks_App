import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refreshTaskList: false,
  taskId: "",
  modalState: false,
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    refreshList: (state) => {
      state.refreshTaskList = !state.refreshTaskList;
    },
    updateTaskId: (state, action) => {
      state.taskId = action.payload;
    },
    updateModalState: (state) => {
      state.modalState = !state.modalState;
    },
  },
});

export const { refreshList, updateTaskId, updateModalState } =
  taskSlice.actions;
export default taskSlice.reducer;
