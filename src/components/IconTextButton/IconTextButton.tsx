import { StyledIconTextButton } from "./IconTextButton.styled";
import { StyledIconTextButtonProps } from "./IconTextButton.types";

const IconTextButton = ({ icon, ...props }: StyledIconTextButtonProps) => {
    return <StyledIconTextButton startIcon={icon} {...props}></StyledIconTextButton>;
};

export default IconTextButton;
