import React from "react";

const StatusIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="status_icon"
            data-name="status icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            color="currentColor"
            {...props}
        >
            <g id="Rectangle_445" data-name="Rectangle 445" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" rx="5" stroke="none" />
                <rect x="1" y="1" width="16" height="16" rx="4" fill="none" />
            </g>
            <g
                id="Rectangle_446"
                data-name="Rectangle 446"
                transform="translate(4 4)"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
            >
                <rect width="10" height="10" rx="2" stroke="none" />
                <rect x="0.5" y="0.5" width="9" height="9" rx="1.5" fill="none" />
            </g>
        </svg>
    );
};

export default StatusIcon;
