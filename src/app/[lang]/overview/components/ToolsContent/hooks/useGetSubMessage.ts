import { useTranslations } from "next-intl";

const useGetSubMessage = (isSearch: boolean, isStatusGroup: boolean) => {
    const t = useTranslations();
    if (isSearch && !isStatusGroup) {
        return t("no_tools_search");
    }
    if (!isSearch && isStatusGroup) {
        return t("no_tools_statusgroup");
    }
    if (isSearch && isStatusGroup) {
        return t("no_tools_serach_statusgroup");
    }
};

export default useGetSubMessage;
