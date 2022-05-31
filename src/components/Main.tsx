import Results from "./Results";
import { useForm } from "react-hook-form";
import usePesel from "../common/usePesel";

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
      return (
        <span className="px-2 text-center" role="alert">
          This field is required
        </span>
      );

    if (errors.pesel.type === "minLength")
      return (
        <span className="px-2 text-center" role="alert">
          This PESEL is too short
        </span>
      );

    if (errors.pesel.type === "maxLength")
      return (
        <span className="px-2 text-center" role="alert">
          This PESEL is too long
        </span>
      );

    if (errors.pesel.type === "pattern")
      return (
        <span className="px-2 text-center" role="alert">
          This PESEL doesn't match the correct pattern
        </span>
      );
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form
        className="bg-purple-400 grid place-items-center w-1/3 h-3/6 rounded-lg"
        onSubmit={handleSubmit((value) => Submit(value.pesel))}
      >
        <label className=" text-neutral-800 drop-shadow-xl text-center ">
          Pesel
          <input
            {...register("pesel", {
              required: "To pole jest wymagane",
              pattern: /^[0-9]{11}/,
              minLength: 11,
              maxLength: 11,
            })}
            type="text"
            className="text-center mt-2 text-black block w-60 shadow-xl rounded-md"
          />
        </label>
        {errors.pesel && validationMessage()}

        {/* todo: add popups for validation errors, fix layout */}

        <button
          type="submit"
          className="bg-fuchsia-700 rounded-md 
         shadow-lg shadow-neutral-800 h-fit w-fit p-2
         text-white container mx-36 my-8 active:translate-y-1"
        >
          Sprawdź
        </button>
        {/* <button
          className="bg-fuchsia-700 rounded-md 
         shadow-lg shadow-neutral-800 h-fit w-fit p-2  
         text-white container mx-36 my-8 active:translate-y-1"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button> */}
      </form>
      <Results sex={current.sex} DOB={current.DOB} correct={current.correct} />
    </div>
  );
};

export default Main;
