import React from "react";

const NoGraphDisplay: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="no_graph_display"
            data-name="no graph display"
            xmlns="http://www.w3.org/2000/svg"
            width="90.398"
            height="90.398"
            viewBox="0 0 90.398 90.398"
        >
            <defs>
                <filter id="Rectangle_440" x="8.5" y="16.199" width="74" height="64" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor="#0d3457" floodOpacity="0.102" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <path
                id="Path_552"
                data-name="Path 552"
                d="M45.2,0A45.2,45.2,0,1,1,0,45.2,45.2,45.2,0,0,1,45.2,0Z"
                fill="#f0f3f5"
            />
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_440)">
                <rect
                    id="Rectangle_440-2"
                    data-name="Rectangle 440"
                    width="46"
                    height="56"
                    rx="5"
                    transform="translate(73.5 22.2) rotate(90)"
                    fill="#fff"
                />
            </g>
            <g id="Group_1174" data-name="Group 1174" transform="translate(29 34.398)">
                <g id="Group_1164" data-name="Group 1164">
                    <g id="Group_1163" data-name="Group 1163">
                        <line
                            id="Line_130"
                            data-name="Line 130"
                            y1="8"
                            x2="8"
                            fill="none"
                            stroke="#e6eaee"
                            strokeLinecap="round"
                            strokeWidth="5"
                        />
                        <line
                            id="Line_131"
                            data-name="Line 131"
                            x2="8"
                            y2="8"
                            fill="none"
                            stroke="#e6eaee"
                            strokeLinecap="round"
                            strokeWidth="5"
                        />
                    </g>
                    <g id="Group_1173" data-name="Group 1173" transform="translate(25)">
                        <line
                            id="Line_130-2"
                            data-name="Line 130"
                            y1="8"
                            x2="8"
                            fill="none"
                            stroke="#e6eaee"
                            strokeLinecap="round"
                            strokeWidth="5"
                        />
                        <line
                            id="Line_131-2"
                            data-name="Line 131"
                            x2="8"
                            y2="8"
                            fill="none"
                            stroke="#e6eaee"
                            strokeLinecap="round"
                            strokeWidth="5"
                        />
                    </g>
                </g>
                <path
                    id="Path_582"
                    data-name="Path 582"
                    d="M289.887,207.5a27.517,27.517,0,0,0,15.447,5.924,25.2,25.2,0,0,0,17.057-5.924"
                    transform="translate(-289.602 -190)"
                    fill="none"
                    stroke="#e6eaee"
                    strokeLinecap="round"
                    strokeWidth="5"
                />
            </g>
        </svg>
    );
};

export default NoGraphDisplay;
