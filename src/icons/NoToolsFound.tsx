import React from "react";

const NoToolsFound: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="no_tools_found"
            data-name="no tools found"
            xmlns="http://www.w3.org/2000/svg"
            width="116"
            height="116"
            viewBox="0 0 116 116"
        >
            <defs>
                <filter id="Rectangle_440" x="14.5" y="23.5" width="88" height="75" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor="#0d3457" floodOpacity="0.102" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g id="Group_1169" data-name="Group 1169" transform="translate(-365 -670)">
                <path
                    id="Path_552"
                    data-name="Path 552"
                    d="M58,0A58,58,0,1,1,0,58,58,58,0,0,1,58,0Z"
                    transform="translate(365 670)"
                    fill="#f0f3f5"
                />
                <g transform="matrix(1, 0, 0, 1, 365, 670)" filter="url(#Rectangle_440)">
                    <rect
                        id="Rectangle_440-2"
                        data-name="Rectangle 440"
                        width="57"
                        height="70"
                        rx="5"
                        transform="translate(93.5 29.5) rotate(90)"
                        fill="#fff"
                    />
                </g>
                <g id="Group_1174" data-name="Group 1174" transform="translate(0 1)">
                    <g id="Group_1164" data-name="Group 1164" transform="translate(1 2)">
                        <g id="Group_1163" data-name="Group 1163" transform="translate(405.617 713.947)">
                            <line
                                id="Line_130"
                                data-name="Line 130"
                                y1="8"
                                x2="8"
                                transform="translate(0.383 0.053)"
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
                                transform="translate(0.383 0.053)"
                                fill="none"
                                stroke="#e6eaee"
                                strokeLinecap="round"
                                strokeWidth="5"
                            />
                        </g>
                        <g id="Group_1173" data-name="Group 1173" transform="translate(430.617 713.947)">
                            <line
                                id="Line_130-2"
                                data-name="Line 130"
                                y1="8"
                                x2="8"
                                transform="translate(0.383 0.053)"
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
                                transform="translate(0.383 0.053)"
                                fill="none"
                                stroke="#e6eaee"
                                strokeLinecap="round"
                                strokeWidth="5"
                            />
                        </g>
                    </g>
                    <path
                        id="Path_553"
                        data-name="Path 553"
                        d="M411.09,737.057h26"
                        transform="translate(-0.59 -1)"
                        fill="none"
                        stroke="#e6eaee"
                        strokeLinecap="round"
                        strokeWidth="5"
                    />
                </g>
            </g>
        </svg>
    );
};

export default NoToolsFound;
