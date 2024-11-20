"use client";
import React, { useState, useEffect } from "react";
import { StyledTypography, StyledVersionTimeBox } from "./TimerBox.styled";
import { TimerBoxProps } from "./TimerBox.types";
import { formatDate } from "@/utils";
import { useTranslations } from "next-intl";

const TimerBox = ({ version }: TimerBoxProps) => {
    const t = useTranslations();
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            setCurrentTime(formatDate(now));
        };

        updateCurrentTime();
        const intervalId = setInterval(updateCurrentTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <StyledVersionTimeBox mt={4} mb={2}>
            {version && <StyledTypography>{t("version", { version })}</StyledTypography>}
            <StyledTypography>{currentTime}</StyledTypography>
        </StyledVersionTimeBox>
    );
};

export default TimerBox;
