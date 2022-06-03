import { useState } from "react";
import langContext, { langs, currentTranslations } from "./common/langContext";
import Main from "./components/Main";
import translations from "./common/lang.json";

const App = () => {
  const changeLanguage = (newLang: langs) => {
    setLang(() => ({
      currentTranslations: translations[`${newLang}`],
      language: newLang,
      changeLanguage,
    }));
  };

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
