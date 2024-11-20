"use client";
import logo from "@/assets/svg/logo.svg";
import { NavigationItem } from "@/components";
import { LogoutIcon } from "@/icons";
import { Box, Collapse, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { StyledBox, StyledDrawer, StyledList } from "./Drawer.styled";
import { DrawerProps } from "./Drawer.types";
import { usePathname, useRouter } from "next/navigation";
import TimerBox from "../TimerBox/TimerBox";
import useContextAction from "../AppBar/hooks/useContextAction";
import { useViewChange } from "../AppBar/hooks";

const Drawer = ({ version, selectedItem, navItems }: DrawerProps) => {
    const t = useTranslations();

    const path = usePathname();
    const router = useRouter();
    const isDefaultOpen = navItems.some(({ link, children }) => children && link && path.includes(link));
    const [isToolsOpen, setIsToolsOpen] = useState(isDefaultOpen);

    const { handleUnsavedView, selectedView } = useContextAction();

    const { isMutated } = useViewChange();

    const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
        e.stopPropagation();
        const lang = "en";
        if (isMutated) {
            try {
                await handleUnsavedView(selectedView);
                if (id === t("tools")) setIsToolsOpen(!isToolsOpen);
            } catch {
                router.push(`/${lang}/overview`);
            }
        } else {
            if (id === t("tools")) setIsToolsOpen(!isToolsOpen);
        }
    };

    return (
        <StyledDrawer variant="permanent" anchor="left">
            <StyledBox>
                <Image priority src={logo} alt="Camtek" />
            </StyledBox>
            <StyledList>
                {navItems.map(item => (
                    <Box key={item.name} onClick={e => handleClick(e, item.name)}>
                        <NavigationItem {...item} selectedItem={selectedItem} isDropdownOpen={isToolsOpen} />
                        {item.children && (
                            <Collapse in={isToolsOpen} timeout="auto">
                                <StyledList style={{ overflowY: "auto", maxHeight: "50vh" }}>
                                    {item?.children?.map((item, index, arr) => (
                                        <Box key={item.name} onClick={e => handleClick(e, item.name)}>
                                            <NavigationItem
                                                {...item}
                                                selectedItem={selectedItem}
                                                isSecondary
                                                isLatest={index === arr.length - 1}
                                            />
                                        </Box>
                                    ))}
                                </StyledList>
                            </Collapse>
                        )}
                    </Box>
                ))}
            </StyledList>
            <Box mt="auto">
                <Box mb={2}>
                    <NavigationItem icon={<LogoutIcon />} name={t("log_out")} />
                </Box>
                <Divider />
                <TimerBox version={version} />
            </Box>
        </StyledDrawer>
    );
};

export default Drawer;
