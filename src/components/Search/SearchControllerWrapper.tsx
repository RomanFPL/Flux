import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import Search from "./Search";
import { SearchProps } from "./Search.types";

interface SearchControllerWrapperProps extends Omit<SearchProps, "searchValue" | "handleChange" | "reset"> {
    name: string;
    rules: RegisterOptions;
}

const SearchControllerWrapper = ({ rules, name, ...props }: SearchControllerWrapperProps) => {
    const { control } = useFormContext();

    // let parsedRules: RegisterOptions | undefined;
    // try {
    //     parsedRules = JSON.parse(rules);
    // } catch (error) {
    //     console.error("Invalid rules format. Expected JSON string.", error);
    // }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
                return (
                    <Search
                        {...props}
                        name={name}
                        searchValue={field.value}
                        handleChange={field.onChange}
                        reset={() => field.onChange("")}
                    />
                );
            }}
        />
    );
};

export default SearchControllerWrapper;
