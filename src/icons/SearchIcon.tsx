import React from "react";

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            id="search_icon"
            data-name="search icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <g id="Group_1243" data-name="Group 1243" transform="translate(-1495.764 -837)">
                <g
                    id="Ellipse_101"
                    data-name="Ellipse 101"
                    transform="translate(1504 843)"
                    fill="none"
                    stroke="#0d3457"
                    strokeWidth="1"
                >
                    <circle cx="5" cy="5" r="5" stroke="none" />
                    <circle cx="5" cy="5" r="4.5" fill="none" />
                </g>
                <path
                    id="Path_584"
                    data-name="Path 584"
                    d="M-9286-22738.09v-6.322"
                    transform="translate(-8011.299 23500.436) rotate(45)"
                    fill="none"
                    stroke="#0d3457"
                    strokeLinecap="round"
                    strokeWidth="1"
                />
            </g>
            <rect id="Rectangle_499" data-name="Rectangle 499" width="24" height="24" fill="none" />
        </svg>
    );
};

export default SearchIcon;
