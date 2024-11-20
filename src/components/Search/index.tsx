import React from "react";
import SearchRoot from "./Search";
import SearchControllerWrapper from "./SearchControllerWrapper";

const Search = (props: React.ComponentProps<typeof SearchRoot>) => {
    return <SearchRoot {...props} />;
};

Search.withController = SearchControllerWrapper;

export default Search;
