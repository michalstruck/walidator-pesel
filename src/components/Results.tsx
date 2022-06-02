import { useContext } from "react";
import langContext from "../common/langContext";

type Props = {
  sexValue: boolean;
  DOBValue: string;
  correct: boolean;
};

const Results = ({ sexValue, DOBValue, correct }: Props) => {
  const { currentTranslations } = useContext(langContext);
  const { DOB, Sex } = currentTranslations;
  return (
    <div
      className="mb-60 whitespace-pre-wrap bg-purple-400 text-neutral-800 w-96 h-24 
    flex items-center rounded-lg p-4 float-left"
    >
      {Sex + ":"} {correct && (sexValue ? "🚺 Kobieta" : "🚹 Mężczyzna")}
      {"\n"}
      {DOB + ":"} {correct && DOBValue}
    </div>
  );
};

export default Results;
