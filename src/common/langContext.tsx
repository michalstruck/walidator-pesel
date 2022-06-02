import { createContext } from "react";

export type langs = "en-US" | "pl-PL" | "fr-FR" | "es-ES";

export const languages = {
  polish: "pl-PL",
  english: "en-US",
  french: "fr-FR",
  spanish: "es-ES",
};

const langContext = createContext<{
  language: string;
  changeLanguage: (newLang: langs) => void;
}>({
  language: languages.polish,
  changeLanguage: () => {},
});

export default langContext;
