import { LightLifeTimeUnits } from "@/services/openApi";

export const normalizeValue = (value: number | undefined) => {
    let normalizedValue = Number(value);

    const notMoreThan = (max: number) => {
        normalizedValue = normalizedValue <= max ? normalizedValue : max;
        return methods;
    };

    const notLessThan = (min: number) => {
        normalizedValue = normalizedValue >= min ? normalizedValue : min;
        return methods;
    };

    const unitNormalize = (units: LightLifeTimeUnits | undefined) => {
        normalizedValue = units === LightLifeTimeUnits.Hours ? Number(value) : Number(value) / 1000000;
        return methods;
    };

    const replaceNegativeValue = (value: number) => {
        normalizedValue = normalizedValue < 0 ? (normalizedValue = value) : normalizedValue;
        return methods;
    };

    const getValue = () => Number(normalizedValue);

    const methods = {
        notMoreThan,
        replaceNegativeValue,
        getValue,
        notLessThan,
        unitNormalize
    };

    return methods;
};
