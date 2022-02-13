import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
import { Web3Context } from "../context/Web3Context";

export default function Home() {
  const { CryptoStack, getAllQuestions, questions, setQuestions } =
    useContext(Web3Context);

  useEffect(() => {
    if (CryptoStack) getQuestions();
  }, [CryptoStack]);

  const getQuestions = async () => {
    try {
      const questions = await getAllQuestions();
      setQuestions(questions ?? []);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] pt-[54px]">
        <h2 className="font-bold text-[32px]">Recently asked questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[30px]">
          {questions?.length !== 0 ? (
            questions?.map(({ answers, isAnswered, questionString, id }) => (
              <QuestionCard
                question={questionString}
                answers={answers}
                isAnswered={isAnswered}
                questionId={id}
                key={id}
              />
            ))
          ) : (
            <div>No recently asked questions found</div>
          )}
        </div>
      </main>
    </>
  );
}
