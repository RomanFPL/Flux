import React from "react";

const NonValidIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="nonvalid_icon"
            data-name="nonvalid icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            color="currentColor"
            {...props}
        >
            <rect id="Rectangle_374" data-name="Rectangle 374" width="20" height="20" fill="none" />
            <circle id="Ellipse_78" data-name="Ellipse 78" cx="10" cy="10" r="10" fill="#c95d63" />
            <g id="Group_1092" data-name="Group 1092" transform="translate(6.617 6.947)">
                <line
                    id="Line_130"
                    data-name="Line 130"
                    y1="6"
                    x2="6"
                    transform="translate(0.383 0.053)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth="2"
                />
                <line
                    id="Line_131"
                    data-name="Line 131"
                    x2="6"
                    y2="6"
                    transform="translate(0.383 0.053)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
};

export default NonValidIcon;
