export const getToolWidgetById = <T extends { id: string }>(items: T[], id: string): T | undefined =>
    items.find(({ id: itemId }) => itemId === id);
