import Results from "./Results";
import { useForm } from "react-hook-form";
import usePesel from "../common/usePesel";
import { ReactNode } from "react";

interface Form {
  pesel: string;
}

const result = [
  {
    status: false,
    message: "Pesel musi składać się z 11 cyfr",
  },
  {
    status: false,
    message: "Pesel nieprawidłowy",
  },
  {
    status: true,
    message: "Pesel prawidłowy",
  },
];
const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <span
      className="p-2 text-center absolute z-10
        bg-slate-500
        text-xs font-semibold rounded-lg opacity-80 mb-8
      "
      role="alert"
    >
      {children}
      <div className="relative">
        <span className="absolute float-left opacity-80 text-slate-500 cursor-default">
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
      return <Wrapper>This field is required</Wrapper>;
    if (errors.pesel.type === "minLength")
      return <Wrapper>This PESEL is too short</Wrapper>;
    if (errors.pesel.type === "maxLength")
      return <Wrapper>This PESEL is too long</Wrapper>;
    if (errors.pesel.type === "pattern")
      return <Wrapper>This PESEL doesn't match the correct pattern</Wrapper>;
  };

  return (
    <div className="bg-stone-200 flex relative items-center justify-center h-screen w-screen text-2xl">
      <form
        className="bg-purple-400 grid place-items-center w-[20%] h-[40%] rounded-lg"
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
            className="text-center mt-1 -mb-5 text-black block w-5/6 shadow-xl 
            rounded-md focus:outline-none focus:ring-purple-500 focus:ring-2 "
          />
          {errors.pesel && validationMessage()}
        </label>
        <button
          type="submit"
          className="w-1/2 flex justify-center py-2 px-4 mb-5
          border border-transparent rounded-md
         text-white bg-fuchsia-600 hover:bg-fuchsia-700 
          active:translate-y-1 focus:ring-fuchsia-500"
        >
          Sprawdź
        </button>
      </form>
      <Results sex={current.sex} DOB={current.DOB} correct={current.correct} />
    </div>
  );
};

export default Main;
