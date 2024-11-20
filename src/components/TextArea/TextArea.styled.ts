import { TextField as MuiTextField, styled } from "@mui/material";

export const StyledTextArea = styled(MuiTextField)({
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    margin: "5px 0 0 0",
    padding: 0,
    border: "1px solid #E6EAEE",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none"
        }
    }
});

export const Star = styled("span")({
    color: "#C95D63",
    marginLeft: "2px"
});
