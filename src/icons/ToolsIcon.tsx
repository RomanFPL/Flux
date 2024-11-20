import React from "react";

const ToolsIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
            <g transform="translate(-124 -311)">
                <line
                    x2="7"
                    y2="3"
                    transform="translate(133.5 315.5)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                />
                <line
                    y1="4"
                    transform="translate(142.346 323.5)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                />
                <line
                    y1="2.5"
                    transform="translate(130.5 318.5)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                />
                <g transform="translate(139 317)" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="3.5" cy="3.5" r="3.5" stroke="none" />
                    <circle cx="3.5" cy="3.5" r="2.5" fill="none" />
                </g>
                <g transform="translate(127 312)" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="3.5" cy="3.5" r="3.5" stroke="none" />
                    <circle cx="3.5" cy="3.5" r="2.5" fill="none" />
                </g>
                <g
                    transform="translate(126 327)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                >
                    <rect x="1" y="1" width="18" height="5" rx="1" fill="none" />
                </g>
                <g
                    transform="translate(126 323)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                >
                    <rect x="1" y="1" width="8" height="4" rx="1" fill="none" />
                </g>
            </g>
            <rect width="24" height="24" fill="none" />
        </svg>
    );
};

export default ToolsIcon;
