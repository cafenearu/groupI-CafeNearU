"use client";
import { useEffect, useState } from "react";
import storeDetail from "../../components/detail/storeDetail";
import storeComments from "../../components/detail/storeComments";
import Header from "../../components/header";
import Gallery from "../../components/detail/Gallery";
import BasicInfo from "../../components/detail/BasicInfo";
import StatusInfo from "../../components/detail/StatusInfo";
import Map from "../../components/detail/Map";
import Head from "../../components/detail/Head";
import Rules from "../../components/detail/Rules";
import Menu from "../../components/detail/Menu";
import Equipments from "../../components/detail/Equipments";
import RatingAndComments from "../../components/detail/RatingAndComments";
import useStorecommentInfo from "../../ApiHook/useFetchInfoComment";
import useStoreBasicInfo from "../../ApiHook/useStoreBasicInfo";

const { introduction, primary_image, secondary_image_1, secondary_image_2 } =
  storeDetail;

export default function StoreDetail() {
  const { basiccommentInfo, isLoading, isError, mutate } =
    useStorecommentInfo();
  console.log(basiccommentInfo);
  console.log(isError);

  const { basicInfo, isLoadingb, isErrorb, mutateb } = useStoreBasicInfo();

  console.log("b", basicInfo);
  console.log("e", isErrorb);
  if (isErrorb) {
    console.error("API 请求失败:", isErrorb); // 打印错误信息
    return <div>API 请求失败，请重试。</div>;
  }
  // useEffect(() => {
  //   useStorecommentInfo();
  //   useStoreBasicInfo();
  // }, [basicInfo]);
  const [shouldRenderRatingAndComments, setShouldRenderRatingAndComments] =
    useState(false);

  useEffect(() => {
    // 使用 setTimeout 延迟三秒后设置 shouldRenderRatingAndComments 为 true
    const delay = 3000; // 三秒的毫秒数
    setTimeout(() => {
      setShouldRenderRatingAndComments(true);
    }, delay);
  }, []);
  return (
    <div>
      <Header />
      {isLoading && isLoadingb ? (
        <div className="flex flex-col items-center w-full  mx-auto justify-center min-h-screen">
          <img
            src="../cat.gif"
            alt="cafe"
            className="block mb-4  w-[20%] h-auto text-gray-600 mt-28"
          />
          <div className="container mx-auto flex-col md:flex-row flex items-center justify-center">
            <p className="text-gray-600 text-2xl mb-2 me-4 font-logo">
              CafeNearU
            </p>
            <p className="text-gray-700 text-xl">正在努力為您加載</p>
          </div>
        </div>
      ) : (
        <>
          <div className="container mx-2 md:mx-auto py-8 mt-20">
            <div className="text-base text-gray-800">
              {basicInfo?.data.shop.introduction}
            </div>
            <div className="grid grid-cols-12 mt-4 gap-2">
              <div className="col-span-12 lg:col-span-8">
                <Gallery
                  primary={basicInfo?.data.shop.primary_image}
                  secondary={[
                    basicInfo?.data.shop.secondary_image_1,
                    basicInfo?.data.shop.secondary_image_2,
                  ]}
                />
                <Head {...basicInfo} />
                <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
                <Rules {...storeDetail} />
                <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
                <Menu {...basicInfo} />
                <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
                <Equipments {...storeDetail} />
                <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
                {shouldRenderRatingAndComments && (
                  <RatingAndComments {...storeComments} />
                )}
              </div>
              <div className="col-span-12 lg:col-span-4 flex flex-col mt-4 lg:mt-0">
                <Map />
                <BasicInfo {...basicInfo} />
                <StatusInfo />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
