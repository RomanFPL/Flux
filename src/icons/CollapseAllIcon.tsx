import React from "react";

const CollapseAllIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="collapse_all_icon"
            data-name="collapse all icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <rect id="Rectangle_354" data-name="Rectangle 354" width="24" height="24" fill="none" />
            <line
                id="Line_77"
                data-name="Line 77"
                x2="11"
                transform="translate(6.5 7.75)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
            />
            <path
                id="Path_423"
                data-name="Path 423"
                d="M0,9.986,4.993,4.993,0,0"
                transform="translate(7 16.247) rotate(-90)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

export default CollapseAllIcon;
