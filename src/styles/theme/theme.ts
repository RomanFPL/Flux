import { createTheme } from "@mui/material/styles";
import { Open_Sans } from "next/font/google";
import colors from "./colors";
import "./muiTypes.d.ts";

const openSans = Open_Sans({
    weight: ["300", "400", "600", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"]
});

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary
        },
        secondary: {
            main: colors.secondary
        },
        background: {
            default: colors.background
        },
        text: {
            primary: colors.textPrimary
        },
        warning: {
            main: colors.warning
        },
        navigation: colors.navigation,
        border: colors.border,
        hover: colors.hover,
        status: colors.status,
        errors: colors.errors,
        prediction: colors.prediction,
        shadow: colors.shadow,
        secgem: colors.secgem,
        disabled: colors.disabled,
        charts: colors.charts,
        selected: colors.backgroundSecondary,
        common: {
            white: colors.white
        }
    },
    typography: {
        fontFamily: openSans.style.fontFamily,
        fontSize: 14,
        h1: {
            fontSize: 35
        },
        h2: {
            fontSize: 24
        },
        h6: {
            fontSize: 13
        },
        body1: {
            fontSize: 14
        },
        body2: {
            fontSize: 12
        }
    },
    spacing: 5,
    shape: {
        borderRadius: 10
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    color: colors.textPrimary
                },
                h2: {
                    fontSize: 24
                },
                h3: {
                    opacity: 0.5,
                    fontWeight: "bold",
                    textTransform: "uppercase"
                },
                h4: {
                    fontWeight: "bold"
                },
                h5: {
                    fontWeight: "bold",
                    fontSize: 18
                },
                h6: {
                    opacity: 0.5,
                    fontSize: 13
                },
                body2: {
                    fontSize: 12
                },
                subtitle1: {
                    fontStyle: "italic",
                    opacity: 0.5,
                    fontSize: 12
                },
                subtitle2: {
                    opacity: 0.5
                }
            }
        },
        MuiDivider: {
            variants: [
                {
                    props: { variant: "small" },
                    style: {
                        height: "20px"
                    }
                },
                {
                    props: { variant: "middle" },
                    style: {
                        height: "40px"
                    }
                }
            ],
            styleOverrides: {
                root: {
                    backgroundColor: colors.border,
                    borderColor: colors.border,
                    borderWidth: "1px",
                    borderStyle: "solid"
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: `
                html, body {
                    background-color: ${colors.secondary};
                    color: ${colors.textPrimary};
                    margin: 0;
                    padding: 0;
                    overflow-y: clip ;
                }
                *::-webkit-scrollbar {
                    width: 5px;
                    height: 5px;
                    margin-right: 5px;
                }
                *::-webkit-scrollbar-track {
                    background: ${colors.border};
                    border-radius: 10px;
                }
                *::-webkit-scrollbar-thumb {
                    background-color: ${colors.primary};
                    border-radius: 10px;
                    // border: 2px solid ${colors.border};
                }
                *::-webkit-scrollbar-thumb:hover {
                    background-color: ${colors.textPrimary};
                },
                a {
                    text-decoration: none;
                }
        `
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: colors.textPrimary,
                    fontWeight: "normal",
                    "&.Mui-selected": {
                        color: "white",
                        backgroundColor: colors.primary,
                        "&:hover": {
                            backgroundColor: colors.primary
                        }
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    backgroundColor: colors.secondary,
                    color: colors.textPrimary
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true
            },
            styleOverrides: {
                text: {
                    color: colors.textPrimary,
                    fontSize: "14px",
                    textTransform: "none",
                    padding: "0px 1px",
                    minWidth: "auto",
                    fontWeight: 400,
                    display: "inline-block",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        padding: "0px 0px"
                    }
                }
            },
            variants: [
                {
                    props: { variant: "fill" },
                    style: {
                        background: colors.secondary,
                        textTransform: "capitalize",
                        "&:hover": {
                            backgroundColor: colors.secondary,
                            fontWeight: "bold",
                            padding: "0px 0px",
                            boxShadow: colors.boxShadow
                        }
                    }
                }
            ]
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: "10px",
                    ".MuiList-root": {
                        padding: 0,
                        boxSizing: "border-box"
                    }
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    width: "fit-content",
                    backgroundColor: colors.secondary,
                    "&:hover": {
                        boxShadow: colors.boxShadow,
                        backgroundColor: colors.hover
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: colors.navigation,
                    color: colors.textPrimary,
                    boxShadow: colors.boxShadow,
                    borderRadius: "6px",
                    alignItems: "center"
                }
            },
            defaultProps: {
                placement: "bottom"
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.tableShadow
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: colors.tableCell,
                    fontSize: "14px",
                    fontWeight: "normal",
                    lineHeight: 1.3
                },
                root: {
                    borderBottom: `px solid ${colors.border}`
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.backgroundSecondary,
                    color: colors.textPrimary,
                    fontSize: "14px",
                    fontWeight: "bold",
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    "&:hover": {
                        borderRadius: "50%",
                        boxShadow: colors.boxShadow
                    }
                }
            }
        },
        MuiBadge: {
            styleOverrides: {
                root: {
                    ".MuiBadge-badge": {
                        backgroundColor: colors.primary,
                        color: colors.navigation,
                        padding: 0,
                        margin: 0,
                        height: "23px",
                        width: "23px",
                        borderRadius: "50%",
                        fontWeight: "bold",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                        // right: "auto"
                    }
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: colors.textPrimary,
                    fontSize: "12px"
                }
            }
        }
    }
});

export default theme;
