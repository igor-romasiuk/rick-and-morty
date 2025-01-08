import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isMenuOpen: boolean;
  isModalOpen: boolean;
}

const initialState: UIState = {
  isMenuOpen: false,
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { toggleMenu, toggleModal } = uiSlice.actions;
export default uiSlice.reducer;
