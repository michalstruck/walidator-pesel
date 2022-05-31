type Props = {
  sex: boolean;
  DOB: string;
  correct: boolean;
};

const Results = ({ sex, DOB, correct }: Props) => {
  console.log(correct, sex);
  return (
    <div className="whitespace-pre-wrap bg-purple-400 text-neutral-800 w-fit h-fit grid place-items-center rounded-lg p-4">
      Płeć: {correct && (sex ? "🚺 Kobieta" : "🚹 Mężczyzna")}
      {"\n"}
      Data urodzenia: {correct && DOB}
    </div>
  );
};

export default Results;
