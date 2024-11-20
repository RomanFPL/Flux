import React from "react";

const AddIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="add_icon"
            data-name="add icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <line
                id="Line_188"
                data-name="Line 188"
                x2="10"
                transform="translate(7 12)"
                fill="none"
                stroke="#0d3457"
                strokeLinecap="round"
                strokeWidth="2"
            />
            <line
                id="Line_189"
                data-name="Line 189"
                x2="10"
                transform="translate(12 7.205) rotate(90)"
                fill="none"
                stroke="#0d3457"
                strokeLinecap="round"
                strokeWidth="2"
            />
            <g
                id="Ellipse_94"
                data-name="Ellipse 94"
                transform="translate(2 2)"
                fill="none"
                stroke="#0d3457"
                strokeWidth="2"
            >
                <circle cx="10" cy="10" r="10" stroke="none" />
                <circle cx="10" cy="10" r="9" fill="none" />
            </g>
            <rect id="Rectangle_459" data-name="Rectangle 459" width="24" height="24" rx="2" fill="none" />
        </svg>
    );
};

export default AddIcon;
