import { useState, useEffect } from "react";

/**
 * A custom hook that updates the current time every minute, synchronized to the start of each new minute.
 * @returns {Date} The current time updated every minute.
 */
export const useMinuteTimer = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const updateCurrentTime = () => {
            setCurrentTime(new Date());
        };

        const getTimeUntilNextMinute = () => {
            const now = new Date();
            const nextMinute = new Date(now.getTime() + 60000);
            nextMinute.setSeconds(0, 0);
            return nextMinute.getTime() - now.getTime();
        };

        // Set an initial timeout to update at the next minute mark
        const timeoutId = setTimeout(() => {
            updateCurrentTime();
            // Schedule subsequent updates every minute
            const intervalId = setInterval(updateCurrentTime, 60000);
            return () => clearInterval(intervalId);
        }, getTimeUntilNextMinute());

        // Clean up timeout and interval on component unmount
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return currentTime;
};
