import Header from "./Header";
import Footer from "./Footer";
import type { ReactNode } from "react";

type PageLayoutProps = {
    children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className="bg-linear-to-b from-purple-200 to-white min-h-screen">
            <Header />
            <div className="mx-4 rounded-2xl bg-white">{children}</div>
            <Footer />
        </div>
    );
};

export default PageLayout;

