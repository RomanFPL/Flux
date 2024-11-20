import React from "react";

const ApproveIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
    return (
        <svg
            id="arrow_icon"
            data-name="arrow icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <g
                id="Ellipse_104"
                data-name="Ellipse 104"
                transform="translate(2 2)"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
            >
                <circle cx="10" cy="10" r="10" stroke="none" />
                <circle cx="10" cy="10" r="9" fill="none" />
            </g>
            <rect id="Rectangle_574" data-name="Rectangle 574" width="24" height="24" rx="2" fill="none" />
            <path
                id="Path_604"
                data-name="Path 604"
                d="M2097.746-19688.7l2.8,2.824,5.927-5.971h0"
                transform="translate(-2090.112 19701.498)"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

export default ApproveIcon;
