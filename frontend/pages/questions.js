import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
import { dummyData } from "../utils/dummyData";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] pt-[54px]">
        <h2 className="font-bold text-[32px]">Recently asked questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[30px]">
          {dummyData.map(({ answers, isAnswered, question, questionId }, i) => (
            <QuestionCard
              question={question}
              answers={answers}
              isAnswered={isAnswered}
              questionId={questionId}
              key={i}
            />
          ))}
        </div>
      </main>
    </>
  );
}
