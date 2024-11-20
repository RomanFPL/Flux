import { fetchToolsData } from "@/services";
import { redirect } from "next/navigation";

interface ToolsProps {
    params: {
        lang: string;
    };
}

//TODO add this logic to middleware

export default async function Profile({ params }: ToolsProps) {
    const lang = params.lang || "en";
    const tools = await fetchToolsData();
    const firstTool = tools?.[0]?.toolId;
    if (firstTool) {
        redirect(`/${lang}/tools/${firstTool}`);
    } else {
        redirect("/");
    }
}
