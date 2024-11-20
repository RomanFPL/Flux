import { IconButton } from "@/components";
import { SecgemIcon, ToolCloseOpenSignIcon } from "@/icons";
import { ActiveSecsGemStatus } from "@/services/openApi";
import { getSecGem, getStatus } from "@/utils";
import { Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    EllipsisTypography,
    ExtendedTypography,
    SecGemBox,
    TitleTypography,
    ToolCardContainer,
    ToolHead,
    ToolInfo,
    TypographyStyle
} from "./ToolCard.styled";
import { ToolCardPropsNew } from "./ToolCard.types";
import useGridPlate from "../../hooks/useGridPlate";
import { Layouts } from "../../types/slices.types";

const ToolCard = ({
    toolInfoStatus,
    isExpand = false,
    changeExpandFlag = false,
    dragged = false
}: ToolCardPropsNew) => {
    const t = useTranslations();
    // TODO later we should move it to separate function everywhere
    const grid = useGridPlate();

    const [isOpen, setIsOpen] = useState(false);
    const isToolsExpand = Layouts.health_tools === grid || Layouts.tools === grid;

    const toolData = toolInfoStatus.toolStatus;
    const toolIdentity = toolInfoStatus.identity;

    //TODO find better solution | refactor
    const isLongText =
        !!toolData?.lastLogMessage?.longMessage?.split(" ").length && toolData.lastLogMessage.longMessage.length > 26;
    const isSegIcon = ActiveSecsGemStatus.NotExists !== toolData?.activeSecsGemStatus;

    const handleLongTextClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const { color: segColor, name: segName } = getSecGem(toolData?.activeSecsGemStatus, t);

    const { longMessage } = toolInfoStatus.toolStatus?.lastLogMessage || {};
    const colorStatus = getStatus(toolData?.activeToolStatus).color;
    const isIcon = isSegIcon || !!isLongText;

    const { activeToolStatus } = toolInfoStatus.toolStatus || {};
    const { name: activeName } = getStatus(activeToolStatus, t);

    // update isOpen when expand all / collapse all buttons were clicked
    useEffect(() => {
        setIsOpen(isExpand);
    }, [changeExpandFlag, isExpand]);

    const typographyRef = useRef<HTMLInputElement | null>(null);
    const [isTooltip, setIsTooltip] = useState(false);

    const compareSize = () => {
        const element = typographyRef.current;
        if (element) {
            const isTooltip = element.scrollWidth > element.clientWidth;
            setIsTooltip(isTooltip);
        }
    };

    // Check whether to display tooltip on name when section resize or when tool card expand/collapse
    useEffect(() => {
        compareSize();
    }, [isToolsExpand, isOpen]);

    // Check whether to display tooltip on name on reload and on resize
    useEffect(() => {
        compareSize();
        window.addEventListener("resize", compareSize);
        return () => {
            window.removeEventListener("resize", compareSize);
        };
    }, []);

    return (
        <Link href={`tools/${toolIdentity?.toolId}` || ""} passHref>
            <ToolCardContainer dragged={dragged} statusColor={colorStatus} isOpen={isOpen}>
                <ToolHead>
                    <Tooltip title={toolIdentity?.machineName} disableHoverListener={!isTooltip}>
                        <TitleTypography
                            onMouseEnter={compareSize}
                            ref={typographyRef}
                            isIcon={isIcon}
                            wrapText={isOpen}
                        >
                            {toolIdentity?.machineName}
                        </TitleTypography>
                    </Tooltip>
                    {isSegIcon && (
                        <Tooltip title={segName}>
                            <SecGemBox>
                                <SecgemIcon color={segColor} />
                            </SecGemBox>
                        </Tooltip>
                    )}
                    {isLongText && (
                        <IconButton size="small" onClick={handleLongTextClick}>
                            <ToolCloseOpenSignIcon
                                style={{
                                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                                }}
                            />
                        </IconButton>
                    )}
                </ToolHead>
                <TypographyStyle>{activeName}</TypographyStyle>
                <ToolInfo>
                    {isOpen ? (
                        <ExtendedTypography variant="h6">{longMessage}</ExtendedTypography>
                    ) : (
                        <EllipsisTypography variant="h6">{longMessage}</EllipsisTypography>
                    )}
                </ToolInfo>
            </ToolCardContainer>
        </Link>
    );
};

export default ToolCard;
