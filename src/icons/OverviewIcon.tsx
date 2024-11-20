import React from "react";

const OverviewIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            color="currentColor"
            {...props}
        >
            <rect width="24" height="24" fill="none" />
            <g transform="translate(6 6)" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="3" cy="3" r="3" stroke="none" />
                <circle cx="3" cy="3" r="2" fill="none" />
            </g>
            <g transform="translate(12 13)" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="3" cy="3" r="3" stroke="none" />
                <circle cx="3" cy="3" r="2" fill="none" />
            </g>
            <g transform="translate(18 6)" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="3" cy="3" r="3" stroke="none" />
                <circle cx="3" cy="3" r="2" fill="none" />
            </g>
            <g transform="translate(0 13)" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="3" cy="3" r="3" stroke="none" />
                <circle cx="3" cy="3" r="2" fill="none" />
            </g>
            <line y1="4" x2="4" transform="translate(4 11)" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="4" y1="4" transform="translate(10 11)" fill="none" stroke="currentColor" strokeWidth="2" />
            <line y1="4" x2="4" transform="translate(16 11)" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
};

export default OverviewIcon;
