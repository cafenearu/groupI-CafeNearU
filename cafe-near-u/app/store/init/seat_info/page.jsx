"use client";

import "react-time-picker/dist/TimePicker.css";
import HeaderStore from "../../../components/storeside/HeaderStore";
import { useState } from "react";
import Cookies from "js-cookie";
import shopSeatTypeUpdate from "../../../lib/store_manage/shopSeatTypeUpdate";
import shopStatusUpdate from "../../../lib/store_manage/shopStatusUpdate";

import {
    Button,
    Card,
    Input,
    List,
    ListItem,
    ListItemSuffix,
    IconButton,
} from "@material-tailwind/react";

function TrashIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
        >
            <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
            />
        </svg>
    );
}

async function handleSubmit(seatType) {
    const token = Cookies.get("tokenOwner");
    const data = await shopSeatTypeUpdate(token, { seats: seatType });
    const res = await shopStatusUpdate(token, {
        operating_status: "正常營業",
        type: seatType[0].type,
        available_seats: seatType[0].total_seats,
    });
    console.log(data);
    if (data === 200 && res === 200) {
        window.location.replace("/store");
    } else {
        window.location.replace(`https://http.cat/${res}`);
    }
}

export default function Home() {
    const [category, setCategory] = useState("");
    const [number, setNumber] = useState("");

    const [seatType, setSeatType] = useState([]);

    return (
        <>
            <HeaderStore />
            <div className="flex flex-col justify-start top-0 bg-white z-50">
                <div className="mt-2 flex flex-col items-start border-l-[#7D6E83] border-l-8 lg:container lg:mx-auto ">
                    <div className="pl-2 text-xl text-[#7D6E83] mb-1 w-fit py-1 transition-all text-left font-medium">
                        座位種類設定
                    </div>
                    <div className="pl-2 text-base text-gray-700 mr-2 text-left font-normal">
                        由於您初次使用本系統，請於此設定您的座位資訊
                    </div>
                </div>
            </div>
            <div
                divider
                className="flex flex-col space-x-4 lg:container lg:mx-auto mt-6"
            >
                <div className="ml-4  text-gray-800 ">新增座位</div>
                <div className="flex flex-row ml-2 mt-2 mb-2 gap-2 flex-wrap">
                    <div className="flex-wrap">
                        <Input
                            label="座位類別"
                            className="py-4"
                            containerProps={{ className: "w-full" }}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            label="座位數量"
                            className="py-4"
                            containerProps={{ className: "w-full" }}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>

                    <Button
                        className="py-2 px-3 text-base bg-[#7D6E83] w-auto"
                        onClick={() =>
                            setSeatType([
                                ...seatType,
                                {
                                    icon: "icon",
                                    type: category,
                                    total_seats: Number(number),
                                },
                            ])
                        }
                    >
                        新增
                    </Button>
                </div>
                <div className="ml-4  text-gray-800 mt-2">清單預覽</div>

                {seatType.length ? (
                    <Card className="w-auto">
                        <List>
                            {seatType.map((seat, index) => (
                                <ListItem
                                    ripple={false}
                                    key={index}
                                    className="py-1 pr-1 pl-4"
                                >
                                    <div className="flex flex-row gap-2">
                                        <div>{seat.type}</div>{" "}
                                        <strong> {seat.total_seats}</strong>
                                    </div>
                                    <ListItemSuffix>
                                        <IconButton
                                            variant="text"
                                            color="blue-gray"
                                            onClick={() => {
                                                setSeatType(
                                                    seatType.filter(
                                                        (item, i) => i !== index
                                                    )
                                                );
                                            }}
                                        >
                                            <TrashIcon />
                                        </IconButton>
                                    </ListItemSuffix>
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                ) : (
                    <></>
                )}
            </div>

            <div className="mt-4 space-x-4 lg:container lg:mx-auto flex flex-row justify-end">
                <Button
                    className="text-base px-6 bg-[#7D6E83] text-white"
                    onClick={() => handleSubmit(seatType)}
                >
                    更新並進入店家後台
                </Button>
            </div>
        </>
    );
}
