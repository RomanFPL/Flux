import { FormLabel } from "@mui/material";
import { StyledBox, StyledToggleButton, StyledToggleButtonGroup } from "./Toggle.styled";
import { ToggleProps } from "./Toggle.types";

function Toggle<T extends string>({ items, value, handleChange, label, ...props }: ToggleProps<T>) {
    return (
        <StyledBox component="section">
            {label && <FormLabel component="label">{label}</FormLabel>}
            <StyledToggleButtonGroup {...props} value={value} exclusive onChange={handleChange}>
                {items.map((item, index) => (
                    <StyledToggleButton
                        numitems={items.length - 1}
                        index={index}
                        key={index}
                        value={item}
                        aria-label={item}
                    >
                        {item}
                    </StyledToggleButton>
                ))}
            </StyledToggleButtonGroup>
        </StyledBox>
    );
}

export default Toggle;
