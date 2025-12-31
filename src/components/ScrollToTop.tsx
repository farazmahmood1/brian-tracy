import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/hooks/useLenis";

/**
 * Ensures every route navigation starts at the top.
 * (We skip when there's a hash because that likely indicates in-page navigation.)
 */
export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) return;
    scrollToTop();
  }, [location.pathname]);

  return null;
};
