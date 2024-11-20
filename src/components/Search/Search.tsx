/* eslint-disable react-hooks/exhaustive-deps */
import { SearchIcon, SearchRemoveIcon } from "@/icons";
import { StyledEndIcon, StyledSearch, StyledStartIcon } from "./Search.styled";
import { SearchProps } from "./Search.types";

const Search = ({
    name,
    disabled = false,
    defaultName,
    searchValue,
    handleChange,
    rules,
    reset = () => {}
}: SearchProps) => {
    // avoid from adding special characters to search value
    // const sanitizeInput = (input: string) => {
    // return input.replace(/[^a-zA-Z0-9 ]/g, ""); // TODO - GET RULES FROM PROPS /useFormContext()
    // };

    return (
        <StyledSearch
            placeholder={defaultName}
            id="search"
            disabled={disabled}
            onChange={handleChange}
            value={searchValue}
            aria-controls={name}
            InputProps={{
                autoComplete: "off",
                autoCapitalize: "none",
                autoCorrect: "off",
                spellCheck: "false",
                startAdornment: (
                    <StyledStartIcon position="start">
                        <SearchIcon />
                    </StyledStartIcon>
                ),
                endAdornment: searchValue ? (
                    <StyledEndIcon position="end">
                        <SearchRemoveIcon cursor={"pointer"} onClick={() => reset()} />
                    </StyledEndIcon>
                ) : null
            }}
        ></StyledSearch>
    );
};

export default Search;
