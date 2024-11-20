import { CustomThumb } from "./Thumb.styled";

interface ThumbProps extends React.HTMLAttributes<unknown> {
    "data-index"?: number;
}

const Thumb = (props: ThumbProps) => {
    const { children, ...other } = props;
    const index = props["data-index"] ?? 0;

    return (
        <CustomThumb {...other} index={index}>
            {children}
        </CustomThumb>
    );
};

export default Thumb;
