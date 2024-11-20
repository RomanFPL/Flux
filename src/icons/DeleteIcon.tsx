import React from "react";

const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="delete_icon"
            data-name="delete icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <line
                id="Line_205"
                data-name="Line 205"
                x2="10"
                transform="translate(8.465 15.535) rotate(-45)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
            />
            <line
                id="Line_206"
                data-name="Line 206"
                x2="10"
                transform="translate(8.465 8.67) rotate(45)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
            />
            <g
                id="Ellipse_95"
                data-name="Ellipse 95"
                transform="translate(2 2)"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <circle cx="10" cy="10" r="10" stroke="none" />
                <circle cx="10" cy="10" r="9" fill="none" />
            </g>
            <rect id="Rectangle_458" data-name="Rectangle 458" width="24" height="24" rx="2" fill="none" />
        </svg>
    );
};

export default DeleteIcon;
