"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="navigation">
            <Link
                href="/"
                className={`nav-tab ${pathname === "/" ? "active" : ""}`}
            >
                Bug Report Enhancer
            </Link>
            <Link
                href="/settings"
                className={`nav-tab ${pathname === "/settings" ? "active" : ""}`}
            >
                Settings
            </Link>
        </nav>
    );
}
