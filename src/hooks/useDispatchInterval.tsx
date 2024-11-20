import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 *
 * @param actionCreator
 * @param args
 */
export const useDispatchInterval = <Arg extends void | Object>(
    actionCreator: ActionCreatorWithPayload<any, any>,
    args?: Arg,
    intervalValue: number = 1000
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(actionCreator(args as Arg));
        }, intervalValue);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intervalValue]);
};

export default useDispatchInterval;
