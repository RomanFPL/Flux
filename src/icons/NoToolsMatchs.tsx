import React from "react";

const NoToolsMatchs: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="no_tools_matches"
            data-name="no tools matches"
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
            <g id="Group_1169" data-name="Group 1169">
                <path id="Path_552" data-name="Path 552" d="M58,0A58,58,0,1,1,0,58,58,58,0,0,1,58,0Z" fill="#f0f3f5" />
                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_440)">
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
                <g id="Group_1164" data-name="Group 1164" transform="translate(37 37)">
                    <g id="Ellipse_90" data-name="Ellipse 90" fill="none" stroke="#e6eaee" strokeWidth="5">
                        <circle cx="21.5" cy="21.5" r="21.5" stroke="none" />
                        <circle cx="21.5" cy="21.5" r="19" fill="none" />
                    </g>
                    <rect
                        id="Rectangle_438"
                        data-name="Rectangle 438"
                        width="5.001"
                        height="27"
                        rx="2.501"
                        transform="matrix(-0.819, 0.574, -0.574, -0.819, 49.924, 56.527)"
                        fill="#e6eaee"
                    />
                    <g id="Group_1163" data-name="Group 1163" transform="translate(15 15)">
                        <line
                            id="Line_130"
                            data-name="Line 130"
                            y1="13"
                            x2="13"
                            fill="none"
                            stroke="#e6eaee"
                            strokeLinecap="round"
                            strokeWidth="5"
                        />
                        <line
                            id="Line_131"
                            data-name="Line 131"
                            x2="13"
                            y2="13"
                            fill="none"
                            stroke="#e6eaee"
                            strokeLinecap="round"
                            strokeWidth="5"
                        />
                    </g>
                    <rect
                        id="Rectangle_439"
                        data-name="Rectangle 439"
                        width="10.669"
                        height="27"
                        rx="5"
                        transform="matrix(-0.819, 0.574, -0.574, -0.819, 56.424, 60.666)"
                        fill="#d9dee3"
                    />
                </g>
            </g>
        </svg>
    );
};

export default NoToolsMatchs;
