import Results from "./Results";
import { useForm } from "react-hook-form";
import usePesel from "../common/usePesel";
import { ReactNode, useContext } from "react";
import langContext, { langs } from "../common/langContext";

interface Form {
  pesel: string;
  language: langs;
}

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <span
      className="p-1 text-center absolute z-10
        bg-slate-500
        text-xs font-semibold rounded-lg opacity-80 mb-24 ml-72
      "
      role="alert"
    >
      {children}
      <div className="relative">
        <span className="absolute -translate-x-16 -translate-y-1 text-base opacity-80 text-slate-500 cursor-default">
          ▼
        </span>
      </div>
    </span>
  );
};

const Main = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const { language, changeLanguage, currentTranslations } =
    useContext(langContext);

  const { Check, Language } = currentTranslations;

  const { checkPesel, getDate, getGender, current, setCurrent } = usePesel();

  const Submit = (pesel: string) => {
    const { peselArr, correct } = checkPesel(pesel);
    setCurrent(() => ({
      correct,
      pesel: peselArr,
      sex: getGender(peselArr),
      DOB: getDate(peselArr),
    }));
  };

  const validationMessage = () => {
    if (!errors.pesel) return false;

    if (errors.pesel.type === "required")
      return <Wrapper>This field is required, my dear</Wrapper>;
    if (errors.pesel.type === "minLength")
      return <Wrapper>This PESEL is too short I think</Wrapper>;
    if (errors.pesel.type === "maxLength")
      return <Wrapper>This PESEL is too long I do declare</Wrapper>;
    if (errors.pesel.type === "pattern")
      return <Wrapper>A pesel can contain only numbers hun</Wrapper>;
  };

  return (
    <div className="bg-stone-200 relative grid place-items-center h-screen w-screen text-2xl">
      <label className="flex justify-start items-center text-neutral-800 drop-shadow-xl text-center text-xs">
        {Language}
        <select
          className="ml-1 text-center text-black block w-5/6 shadow-xl 
          rounded-md focus:outline-none focus:ring-purple-500 focus:ring-2"
          onChange={(e) => {
            changeLanguage(e.target.value as langs);
          }}
          value={language}
        >
          <option value="plPL">Polski</option>
          <option value="enUS">English</option>
          <option value="esES">Español</option>
          <option value="frFR">Français</option>
        </select>
      </label>

      <form
        className=" bg-purple-400 flex flex-wrap justify-center items-center w-96 h-48 rounded-lg"
        onSubmit={handleSubmit((value) => Submit(value.pesel))}
      >
        <label className="grid place-items-center text-neutral-800 drop-shadow-xl text-center ">
          Pesel
          <input
            {...register("pesel", {
              required: "To pole jest wymagane",
              pattern: /^[0-9]{11}/,
              minLength: 11,
              maxLength: 11,
            })}
            type="text"
            className="text-center mt-1 text-black block w-5/6 shadow-xl 
            rounded-md focus:outline-none focus:ring-purple-500 focus:ring-2 "
          />
        </label>
        {errors.pesel && validationMessage()}
        <button
          type="submit"
          className="w-1/2 flex justify-center py-2 px-4
          border border-transparent rounded-md
         text-white bg-fuchsia-600 hover:bg-fuchsia-700 
          active:translate-y-1 focus:ring-fuchsia-500"
        >
          {Check}
        </button>
      </form>
      <Results
        sexValue={current.sex}
        DOBValue={current.DOB}
        correct={current.correct}
      />
    </div>
  );
};

export default Main;
