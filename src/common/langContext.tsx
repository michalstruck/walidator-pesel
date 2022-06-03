import { createContext } from "react";

export type langs = "enUS" | "plPL" | "frFR" | "esES";

export const currentTranslations = {
  Language: "Language",
  Check: "Check",
  Sex: "Sex",
  DOB: "Date of birth",
  FieldRequired: "To pole jest wymagane",
  PeselTooShort: "Podany pesel jest za krótki",
  PeselTooLong: "Podany pesel jest za długi",
  OnlyNumbers: "Pesel może składać się tylko z cyfr",
  Man: "Mężczyzna",
  Woman: "Kobieta",
};

const langContext = createContext<{
  language: string;
  changeLanguage: (newLang: langs) => void;
  currentTranslations: {
    Language: string;
    Check: string;
    Sex: string;
    DOB: string;
    FieldRequired: string;
    PeselTooShort: string;
    PeselTooLong: string;
    OnlyNumbers: string;
    Man: string;
    Woman: string;
  };
}>({
  language: "enUS",
  changeLanguage: () => {},
  currentTranslations,
});

export default langContext;
