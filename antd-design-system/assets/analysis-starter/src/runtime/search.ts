import { createContext, useContext } from "react";
export const SearchQueryContext = createContext("");
export const useSearchQuery = () => useContext(SearchQueryContext);
