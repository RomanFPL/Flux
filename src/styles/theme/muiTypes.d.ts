import { PaletteOptions as MuiPaletteOptions } from "@mui/material/styles";

declare module "@mui/material/Divider" {
    export interface DividerPropsVariantOverrides {
        small: true;
        middle: true;
    }
}

declare module "@mui/material/Button" {
    export interface ButtonPropsVariantOverrides {
        fill: true;
    }
}

interface CustomPalette {
    navigation: string;
    border: string;
    hover: string;
    status: {
        toolUp: string;
        toolDown: string;
        maintenance: string;
        unknown: string;
    };
    errors: {
        alignment: string;
        scan_2d: string;
        scan_3d: string;
        killaoi: string;
    };
    prediction: string;
    shadow: string;
    secgem: {
        offline: string;
        onlineLocal: string;
        onlineRemote: string;
    };
    disabled: string;
    charts: {
        aqua: string;
        lightBlue: string;
        navy: string;
        yellow: string;
        pink: string;
        aqua: string;
        green: string;
        purple: string;
        orange: string;
        red: string;
        grey: string;
        darkBlue: string;
    };
    selected: string;
}

declare module "@mui/material/styles" {
    // eslint-disable-next-line no-unused-vars
    interface Palette extends MuiPaletteOptions, CustomPalette {}
    // eslint-disable-next-line no-unused-vars
    interface PaletteOptions extends CustomPalette {}
}
