type Props = {
  sex: boolean;
  DOB: string;
  correct: boolean;
};

const Results = ({ sex, DOB, correct }: Props) => {
  return (
    <div
      className="whitespace-pre-wrap bg-purple-400 text-neutral-800 w-[25%] h-[15%] 
    flex items-center rounded-lg p-4 float-left"
    >
      Płeć: {correct && (sex ? "🚺 Kobieta" : "🚹 Mężczyzna")}
      {"\n"}
      Data urodzenia: {correct && DOB}
    </div>
  );
};

export default Results;
