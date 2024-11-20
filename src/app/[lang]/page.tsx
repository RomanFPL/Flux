import { redirect } from "next/navigation";

interface HomeProps {
    params: {
        lang: string;
    };
}

const Home = ({ params }: HomeProps) => {
    const { lang } = params;
    //TODO move redirect logic to middleware
    redirect(`/${lang}/overview`);
};

export default Home;
