export const getLatestLink = (link: string) => {
    return link.split("/").reverse()[0];
};

export const isLinkSelected = (link: string, selectedItem?: string) => {
    const currentElemLink = getLatestLink(link);
    return !!selectedItem
        ?.split("/")
        .filter(slug => !!slug)
        .includes(currentElemLink);
};
