import { useTranslations } from "next-intl";
import { OverviewIcon, ToolsIcon, WarningRedIcon } from "../icons";

const useNavigationConfig = ({ tools }: { tools: { machineName: string; toolId: string }[] }) => {
    const t = useTranslations();
    const lang = "en";

    const toolsChildren = tools.map(({ toolId, machineName }) => ({
        name: machineName,
        link: `/${lang}/tools/${toolId}`
    }));

    return [
        {
            name: t("overview"),
            icon: <OverviewIcon />,
            link: `/${lang}/overview`
        },
        {
            name: t("review_tools"),
            icon: <WarningRedIcon />,
            link: `/${lang}/review-tools`,
            count: 130
        },
        {
            name: t("tools"),
            icon: <ToolsIcon />,
            link: `/${lang}/tools`,
            children: toolsChildren
        }
    ];
};

export default useNavigationConfig;
