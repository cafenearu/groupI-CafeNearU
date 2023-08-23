import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Button,
    Card,
    List,
    ListItemSuffix,
    IconButton,
    ListItem,
} from "@material-tailwind/react";
import { useState } from "react";
import Cookies from "js-cookie";
import shopSeatTypeUpdate from "../../lib/store_manage/shopSeatTypeUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

async function handleSubmit(seatType, handleOpen, setSeatType) {
    const token = Cookies.get("token");
    const data = await shopSeatTypeUpdate(token, { seats: seatType });
    console.log(data);
    if (data === 200) {
        setSeatType([]);
        handleOpen();
        toast.success("更新成功", {
            position: "top-right",
            autoClose: 4999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else {
        handleOpen();
        toast.error(`更新失敗 (Error: ${data})`, {
            position: "top-right",
            autoClose: 4999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

export default function SeatSet({ open, handleOpen }) {
    const [category, setCategory] = useState("");
    const [number, setNumber] = useState("");

    const [seatType, setSeatType] = useState([]);
    return (
        <>
            <Dialog
                size="md"
                open={open}
                handler={handleOpen}
                className="rounded-md"
            >
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start border-l-[#B79681] border-l-8 rounded-t-md">
                        <div className="text-xl text-[#B79681] mb-1 w-fit py-1 transition-all text-left font-medium">
                            店況其他設定
                        </div>
                        <div className="text-base text-gray-700 mr-2 text-left font-normal">
                            座位種類、座位數量
                        </div>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody divider className="flex flex-col">
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
                            className="py-2 px-3 text-base bg-[#B79681] w-auto"
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
                                                            (item, i) =>
                                                                i !== index
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
                </DialogBody>
                <DialogFooter className="space-x-4 ">
                    <Button
                        variant="outlined"
                        onClick={handleOpen}
                        className="text-base px-6 border border-[#B79681] text-[#B79681] "
                    >
                        關閉
                    </Button>
                    <Button
                        onClick={() => {
                            handleSubmit(seatType, handleOpen, setSeatType);
                        }}
                        className="text-base px-6 bg-[#B79681] text-white"
                    >
                        更新
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer
                position="top-right"
                autoClose={4999}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
