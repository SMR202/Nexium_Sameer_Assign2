import React from "react";
import { ModeToggle } from "@/components/ui/themeButton"; // Assuming you have a mode toggle component

const Header = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-black border-b-2">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                Blog Summarizer
            </h1>
            <div className="ml-auto">
                <ModeToggle />
            </div>
        </div>
    );
};

export default Header;
