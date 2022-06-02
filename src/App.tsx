import { useState } from "react";
import langContext, { langs } from "./common/langContext";
import Main from "./components/Main";
import translations from "./common/lang.json";

const App = () => {
  const changeLanguage = (newLang: langs) => {
    setLang((prevState) => ({
      currentTranslations: translations[`${newLang}`],
      language: newLang,
      changeLanguage,
    }));
  };

  const currentTranslations = {
    Language: "Language",
    Check: "Check",
    Sex: "Sex",
    DOB: "Date of birth",
  };

  // const changeCurrentTranslations = (newLang: langs) =>
  //   setLang((prevState) => ({
  //     ...prevState,
  //     currentTranslations: translations[`${newLang}`],
  //   }));

  const [lang, setLang] = useState({
    language: "enUS",
    changeLanguage,
    currentTranslations,
  });

  return (
    <langContext.Provider value={lang}>
      <Main />
    </langContext.Provider>
  );
};

export default App;
