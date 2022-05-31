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

  console.log(errors.pesel?.type);

  const Submit = (pesel: string) => {
    const { peselArr, correct } = checkPesel(pesel);
    setCurrent(() => ({
      correct,
      pesel: peselArr,
      sex: getGender(peselArr),
      DOB: getDate(peselArr),
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form
        className="bg-purple-400 w-fit h-fit grid place-items-center rounded-lg"
        onSubmit={handleSubmit((value) => Submit(value.pesel))}
      >
        <label className="m-2 text-neutral-800 drop-shadow-xl text-center">
          Pesel
          <input
            {...register("pesel", {
              required: "To pole jest wymagane",
              pattern: /^[0-9]{11}/,
              minLength: 11,
              maxLength: 11,
            })}
            onInvalid={() => "lol"}
            type="text"
            className="text-center text-black block w-60 shadow-xl rounded-md required:"
          />
        </label>

        {/* todo: add popups for validation errors, fix layout */}

        <button
          type="submit"
          className="bg-fuchsia-700 rounded-md 
         shadow-lg shadow-neutral-800 h-fit w-fit p-2
         text-white container mx-36 my-8 active:translate-y-1"
        >
          Sprawdź
        </button>
        <button
          className="bg-fuchsia-700 rounded-md 
         shadow-lg shadow-neutral-800 h-fit w-fit p-2  
         text-white container mx-36 my-8 active:translate-y-1"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
        <span id="result" className="result"></span>
      </form>
      <Results sex={current.sex} DOB={current.DOB} correct={current.correct} />
    </div>
  );
};

export default Main;
