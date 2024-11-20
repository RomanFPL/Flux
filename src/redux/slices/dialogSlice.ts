import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DialogTypeAndProps } from "../../components/Dialog/Dialog.types";

interface DialogState {
    dialogConfig: DialogTypeAndProps | null;
}

const initDialog: DialogState = { dialogConfig: null };

const dialogSlice = createSlice({
    name: "dialog",
    initialState: initDialog,
    reducers: {
        openDialog: (state, action: PayloadAction<DialogTypeAndProps>) => {
            state.dialogConfig = action.payload;
        },
        closeDialog: state => {
            state.dialogConfig = null;
        }
    }
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
