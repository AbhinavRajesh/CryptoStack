import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { dummyData } from "../utils/dummyData";

const Question = () => {
  const [data, setData] = useState();
  const router = useRouter();

  useEffect(() => {
    getQuestionDetails(parseInt(router.query?.questionId));
  }, [router.query?.questionId]);

  const getQuestionDetails = (questionId) => {
    const questionDetails = dummyData.find(
      (data) => data.questionId === questionId
    );
    setData(questionDetails);
  };

  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] pt-[54px]">
        {data ? (
          <div>
            <h1 className="font-bold text-[32px]">{data.question}</h1>
            {data?.isAnswered ? (
              <div className="flex flex-col">
                {data.answers?.map((answer, i) => (
                  <div
                    className="shadow p-[30px] text-base text-gray-600 mt-[20px]"
                    key={`answer-${i}`}
                  >
                    {answer}
                  </div>
                ))}
                <div className="flex flex-col items-start mt-[20px]">
                  <p>
                    Not satisfied with the given answer? Write an answer and get
                    a chance to win a NFT!{" "}
                    <Link href="/nft">
                      <a className="text-blue-500 font-semibold">Learn more</a>
                    </Link>
                  </p>
                  <a
                    href="#answer"
                    className="inline-block text-white font-bold bg-blue-500 px-[20px] py-[10px] rounded mt-[20px]"
                  >
                    Write an answer now
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start">
                <p>
                  Question not answered yet. Write an answer and get a chance to
                  win a NFT!{" "}
                  <Link href="/nft">
                    <a className="text-blue-500 font-semibold">Learn more</a>
                  </Link>
                </p>
                <a
                  href="#answer"
                  className="inline-block text-white font-bold bg-blue-500 px-[20px] py-[10px] rounded mt-[20px]"
                >
                  Write an answer now
                </a>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </main>
    </>
  );
};

export default Question;
