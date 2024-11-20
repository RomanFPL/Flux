import { BarChartType } from "@/components/Chart/components/BarChart/BarChart.types";
import { useEffect } from "react";
import { LineChartType } from "../components/LineChart/LineChart.types";

/**
 * A custom hook that tracks whether the mouse is inside the provided element.
 * @param ref - A React ref object pointing to the target element.
 * @returns Boolean indicating whether the mouse is inside the element.
 */
export const useMouseInside = (chart: BarChartType | LineChartType, onChartLeave: () => void): void => {
    useEffect(() => {
        if (chart) {
            const canvas = chart.canvas;

            canvas.addEventListener("mouseleave", onChartLeave);

            return () => {
                canvas.removeEventListener("mouseleave", onChartLeave);
            };
        }
    }, [chart, onChartLeave]);
};
