import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    const pagesThatShouldScrollTop = [
        "/contact/recall",
        "/contact",
        "/complaint",
        "/faq",
        "/contact-us"
    ];

    useEffect(() => {
        if (pagesThatShouldScrollTop.includes(pathname)) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}
