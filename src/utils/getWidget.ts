import { IUserView } from "@/types/userInterface";
import { Layouts } from "@/app/[lang]/overview/page.types";

export default function getWidgetState(widgets: IUserView): Layouts {
    const { tools, health, reports } = widgets;

    if (tools.visible && health.visible && reports.visible) {
        return Layouts.default;
    }

    if (tools.visible && health.visible && !reports.visible) {
        return Layouts.health_tools;
    }

    if (tools.visible && !health.visible && reports.visible) {
        return Layouts.reports_tools;
    }

    if (tools.visible && !health.visible && !reports.visible) {
        return Layouts.tools;
    }

    return Layouts.default;
}

export function getWidgetInvisible(widgets: IUserView): string[] {
    const invisibleWidgets: string[] = [];

    Object.keys(widgets).forEach(key => {
        const widget = widgets[key as keyof IUserView];

        if (typeof widget === "object" && "visible" in widget && !widget.visible) {
            invisibleWidgets.push(key);
        }
    });

    return invisibleWidgets;
}
