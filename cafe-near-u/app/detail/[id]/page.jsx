"use client";
import { useEffect } from "react";
import storeDetail from "../../components/detail/storeDetail";
import storeComments from "../../components/detail/storeComments";
import Header from "../../components/Header";
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

const { introduction, primary_image, secondary_image_1, secondary_image_2 } =
  storeDetail;

export default function StoreDetail() {
  const { basiccommentInfo, isLoading, isError, mutate } =
    useStorecommentInfo();
  console.log(basiccommentInfo);
  return (
    <div>
      <Header />
      <div className="container mx-2 md:mx-auto py-8">
        <div className="text-base text-gray-800">{introduction}</div>
        <div className="grid grid-cols-12 mt-4 gap-2">
          <div className="col-span-12 lg:col-span-8">
            <Gallery
              primary={primary_image}
              secondary={[secondary_image_1, secondary_image_2]}
            />
            <Head {...storeDetail} />
            <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
            <Rules {...storeDetail} />
            <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
            <Menu {...storeDetail} />
            <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
            <Equipments {...storeDetail} />
            <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
            {basiccommentInfo && (
              <RatingAndComments {...basiccommentInfo.data} />
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col mt-4 lg:mt-0">
            <Map />
            <BasicInfo {...storeDetail} />
            <StatusInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
