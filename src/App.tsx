import { useState } from "react";
import langContext, { languages, langs } from "./common/langContext";
import Main from "./components/Main";

const { english } = languages;

const App = () => {
  const changeLanguage = (newLang: langs) => {
    setLang(() => ({ language: newLang, changeLanguage }));
  };
  const [lang, setLang] = useState({
    language: english,
    changeLanguage,
  });

  return (
    <langContext.Provider value={lang}>
      <Main />
    </langContext.Provider>
  );
};

export default App;
