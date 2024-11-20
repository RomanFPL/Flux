import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { AsyncThunk } from "@reduxjs/toolkit";

/**
 * A hook to automatically dispatch a provided Redux thunk action.
 * It uses a JSON representation of the arguments for dependency tracking in useEffect.
 * This approach simplifies the handling of dependencies that are objects or arrays.
 *
 * @param actionCreator - A thunk action creator function.
 * @param args - The arguments required by the thunk action.
 */
export const useAutoFetch = <Arg extends void | Object>(
    actionCreator: AsyncThunk<any, Arg, any>,
    args?: Arg,
    options?: { interval?: number }
) => {
    const dispatch = useAppDispatch();

    // Serialize args to a string to use in the useEffect dependency array.
    // This is necessary to track deep changes in args if it is an object or array.
    const argsString = JSON.stringify(args);
    const optionsString = JSON.stringify(options);

    useEffect(() => {
        const fetchData = () => {
            if (args) {
                dispatch(actionCreator(args));
            } else {
                dispatch(actionCreator(undefined as Arg));
            }
        };

        fetchData(); // Fetch data immediately on mount or args change
        let timerId: NodeJS.Timeout | undefined = undefined;

        if (options?.interval) {
            // Set up the interval only if specified
            timerId = setInterval(fetchData, options.interval);
        }

        return () => {
            if (timerId) clearInterval(timerId); // Clean up the interval on unmount
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, actionCreator, argsString, optionsString]); // Include options.interval in the dependency array
};

export default useAutoFetch;
