import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useDeleteComment = (id) => {
  const usedComment = async () => {
    const cafeid = Cookies.get("storeid");

    try {
      const token = Cookies.get("token");
      const responseprofile = await fetch(
        `https://13.211.10.154/api/1.0shops/${cafeid}/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await responseprofile.json();

      if (responseprofile.ok) {
        console.log("刪除評論成功");
        console.log(responseData);
        return responseData; // 返回删除成功的数据
      } else {
        console.error("刪除評論失敗");
      }
    } catch (error) {
      console.error("刪除評論請求錯誤:", error);
    }
  };

  return { usedComment };
};

export default useDeleteComment;
