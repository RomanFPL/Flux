import React from "react";

const WarningRedIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
            <rect width="24" height="24" fill="none" />
            <g transform="translate(-35.967 -268)">
                <path
                    d="M9.248,3.186a2,2,0,0,1,3.5,0l7.617,13.85A2,2,0,0,1,18.617,20H3.383A2,2,0,0,1,1.63,17.036Z"
                    transform="translate(36.967 269)"
                    fill="#C95D63"
                />
                <line
                    y2="4"
                    transform="translate(47.967 277.5)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth="2"
                />
            </g>
            <g transform="translate(10.5 15)" fill="#fff" stroke="#fff" strokeWidth="2">
                <circle cx="1.5" cy="1.5" r="1.5" stroke="none" />
                <circle cx="1.5" cy="1.5" r="0.5" fill="none" />
            </g>
        </svg>
    );
};

export default WarningRedIcon;
