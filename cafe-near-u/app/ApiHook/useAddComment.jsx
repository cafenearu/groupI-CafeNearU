"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAddComment = (
  content,
  isquiet,
  all,
  clean,
  service,
  food,
  wifi,
  fu
) => {
  const useComment = async () => {
    const userId = Cookies.get("userId");
    const cafeid = Cookies.get("storeid");

    const requestData = {
      user_id: String(userId),
      cafe_id: String(cafeid),
      context: String(content),
      is_quiet: isquiet,
      total_rating: all,
      cleanliness: clean,
      service: service,
      food: food,
      wifi: wifi,
      atmosphere: fu,
    };
    try {
      const token = Cookies.get("token");
      const responseprofile = await fetch(
        `https://13.211.10.154/api/1.0/shops/${cafeid}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      const responseData = await responseprofile.json();
      // console.log(responseData);

      if (responseprofile.ok) {
        console.log("發布評論成功");
        console.log(responseData);
      } else {
        console.error("發布評論失敗");
      }
    } catch (error) {
      console.error("發布評論請求錯誤:", error);
    }
  };

  return { useComment };
};

export default useAddComment;
