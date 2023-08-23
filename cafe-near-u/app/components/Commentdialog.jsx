/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import useAddComment from "../ApiHook/useAddComment"; // 請確保路徑正確

import {
  Card,
  Typography,
  Button,
  ButtonGroup,
  Rating,
  Textarea,
} from "@material-tailwind/react";

export default function Commentdialog({ handleOpen }) {
  const [ratedserve, setratedserve] = useState(4);
  const [ratedfood, setratedfood] = useState(4);
  const [ratednet, setratednet] = useState(4);
  const [ratedfu, setratedfu] = useState(4);
  const [ratedclean, setratedclean] = useState(4);
  const [ratedall, setratedall] = useState(4);
  const [activeButton, setActiveButton] = useState(true);
  const [word, setword] = useState("");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };
  const { useComment } = useAddComment(
    word,
    activeButton,
    ratedall,
    ratedclean,
    ratedserve,
    ratedfood,
    ratednet,
    ratedfu
  );

  const handleCommentSubmit = () => {
    useComment();
    handleOpen();
  };

  return (
    <>
      <Card className="w-full max-h-[80vh] overflow-y-auto">
        <div className="px-4 py-3 text-center font-bold text-xl text-[#030712]">
          評價
        </div>
        <hr className="border-gray-300" />

        <div className="container w-full mx-auto flex-row items-center justify-start px-8 py-4">
          <div className="flex items-center mt-2 mb-2">
            <p className="text-[#030712] text-xl  me-2 text-left font-bold">
              服務
            </p>

            <div className="relative w-[60%]">
              <div className="ml-8 flex items-center gap-2">
                <Rating value={4} onChange={(value) => setratedserve(value)} />
                <Typography color="blue-gray" className="font-medium">
                  {ratedserve}.0 Rated
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 mb-2">
            <p className="text-[#030712] text-xl  me-2 text-left font-bold">
              食物
            </p>

            <div className="relative w-[60%]">
              <div className="ml-8 flex items-center gap-2">
                <Rating value={4} onChange={(value) => setratedfood(value)} />
                <Typography color="blue-gray" className="font-medium">
                  {ratedfood}.0 Rated
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 mb-2">
            <p className="text-[#030712] text-xl  me-2 text-left font-bold">
              網路
            </p>

            <div className="relative w-[60%]">
              <div className="ml-8 flex items-center gap-2">
                <Rating value={4} onChange={(value) => setratednet(value)} />
                <Typography color="blue-gray" className="font-medium">
                  {ratednet}.0 Rated
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 mb-2">
            <p className="text-[#030712] text-xl  me-2 text-left font-bold">
              氣氛
            </p>

            <div className="relative w-[60%]">
              <div className="ml-8 flex items-center gap-2">
                <Rating value={4} onChange={(value) => setratedfu(value)} />
                <Typography color="blue-gray" className="font-medium">
                  {ratedfu}.0 Rated
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 mb-2">
            <p className="text-[#030712] text-xl  me-2 text-left font-bold">
              乾淨
            </p>

            <div className="relative w-[60%]">
              <div className="ml-8 flex items-center gap-2">
                <Rating value={4} onChange={(value) => setratedclean(value)} />
                <Typography color="blue-gray" className="font-medium">
                  {ratedclean}.0 Rated
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 mb-2">
            <p className="text-[#030712] text-xl  me-2 text-left font-bold">
              綜合
            </p>

            <div className="relative w-[60%]">
              <div className="ml-8 flex items-center gap-2">
                <Rating value={4} onChange={(value) => setratedall(value)} />
                <Typography color="blue-gray" className="font-medium">
                  {ratedall}.0 Rated
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-300 w-11/12 mx-auto" />
        <div className="container mx-auto flex-col items-center justify-start px-8 py-4">
          <div className="flex items-center mb-2">
            <p className="text-[#030712] text-xl me-2 mb-2 text-left font-bold">
              咖啡廳風格
            </p>
          </div>

          <ButtonGroup
            variant="outlined"
            size="lg"
            className="flex items-center"
          >
            <Button
              className={`${
                activeButton === true ? "bg-black text-white" : ""
              } hover:bg-black hover:text-white`}
              onClick={() => handleButtonClick(true)}
            >
              安靜
            </Button>
            <Button
              className={`${
                activeButton === false ? "bg-black text-white" : ""
              } hover:bg-black hover:text-white`}
              onClick={() => handleButtonClick(false)}
            >
              熱鬧
            </Button>
          </ButtonGroup>
        </div>
        <hr className="border-gray-300 w-11/12 mx-auto" />
        <div className="container mx-auto flex-col items-center justify-start px-8 py-4">
          <div className="flex items-center mb-2">
            <p className="text-[#030712] text-xl me-2 mb-2 text-left font-bold">
              評價
            </p>
          </div>
          <div className="w-[87%]">
            <Textarea
              label="非常歡迎有話直說"
              onChange={(e) => setword(e.target.value)}
            />
          </div>
        </div>
        <hr className="border-gray-300 w-full mx-auto" />

        <div className="flex justify-center items-center flex-row justify-between mt-4 mb-2">
          <p className="ml-8 text-[#030712] text-md text-left font-bold border-b border-black">
            清除全部
          </p>
          <Button
            className="bg-[#D0B8A8] px-6 py-2 text-lg mr-8 mb-3"
            onClick={handleCommentSubmit}
          >
            送出評論
          </Button>
        </div>
      </Card>
    </>
  );
}
