import { useContext, useState } from "react";
import { Web3Context } from "../../context/Web3Context";

const QuestionPopup = ({ visible, setVisible }) => {
  const { loading, createNewQuestion } = useContext(Web3Context);
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    createNewQuestion(question);
  };

  if (!visible) return null;

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full bg-[#00000052]"></div>
      <div className="flex flex-col pb-[35px] px-[25px] pt-[14px] md:pb-[70px] md:px-[50px] md:pt-[30px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-[600px] w-full rounded-[10px]">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="w-full flex justify-end items-center">
              <span
                className="text-[32px] cursor-pointer"
                onClick={() => setVisible(false)}
              >
                &times;
              </span>
            </div>
            <form
              onSubmit={handleSubmit}
              className="h-full flex flex-col items-start justify-center"
            >
              <label htmlFor="question" className="text-lg font-semibold">
                Question
              </label>
              <textarea
                type="text"
                name="question"
                id="question"
                onChange={(e) => setQuestion(e.target.value)}
                className="resize-none rounded bg-gray-100 px-[20px] py-[10px] mt-[15px] w-full outline-none"
                placeholder="Enter your question"
                required
                rows={5}
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold text-base px-[20px] py-[10px] rounded w-full mt-[15px]"
              >
                Ask
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default QuestionPopup;
