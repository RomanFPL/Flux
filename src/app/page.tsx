import { redirect } from "next/navigation";

const Page = ({ params }: { params: { lang: string } }) => {
    const { lang = "en" } = params;
    redirect(`/${lang}`);
};

export default Page;
