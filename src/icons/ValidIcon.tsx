import React from "react";

const ValidIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="valid_icon"
            data-name="valid icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            {...props}
        >
            <g id="Group_1104" data-name="Group 1104" transform="translate(-10.646 -11)">
                <rect
                    id="Rectangle_375"
                    data-name="Rectangle 375"
                    width="20"
                    height="20"
                    transform="translate(10.646 11)"
                    fill="none"
                />
                <circle
                    id="Ellipse_79"
                    data-name="Ellipse 79"
                    cx="10"
                    cy="10"
                    r="10"
                    transform="translate(10.646 11)"
                    fill="#5dac81"
                />
                <g id="Group_1093" data-name="Group 1093" transform="translate(17.264 18.461)">
                    <line
                        id="Line_130"
                        data-name="Line 130"
                        y1="5.076"
                        x2="5.076"
                        transform="translate(1.692)"
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeWidth="2"
                    />
                    <line
                        id="Line_131"
                        data-name="Line 131"
                        x2="1.692"
                        y2="1.692"
                        transform="translate(0 3.384)"
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeWidth="2"
                    />
                </g>
            </g>
        </svg>
    );
};

export default ValidIcon;
