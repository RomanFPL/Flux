import React from "react";

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            color="currentColor"
            {...props}
        >
            <line
                id="Line_245"
                data-name="Line 245"
                y1="8"
                x2="8"
                transform="translate(12 6.344) rotate(45)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
            />
            <line
                id="Line_246"
                data-name="Line 246"
                x2="8"
                y2="8"
                transform="translate(12 6.344) rotate(45)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
            />
            <rect id="Rectangle_555" data-name="Rectangle 555" width="24" height="24" fill="none" />
        </svg>
    );
};

export default PlusIcon;
