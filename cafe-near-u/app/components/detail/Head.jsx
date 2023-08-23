import { Chip, IconButton } from "@material-tailwind/react";

export default function Head({ name }) {
  return (
    <div className="mt-4">
      <div className="col-span-8 flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="text text-2xl md:text-3xl py-4 font-light">
            {name}
          </div>
          <Chip
            color="teal"
            value="G 台電大樓"
            className="ml-4 py-0 text-base font-normal h-10 self-center"
          />
          <Chip
            value="工作 / 唸書"
            variant="outlined"
            className="ml-4 py-0 text-base font-normal h-10 self-center"
          />
        </div>
        <IconButton
          variant="outlined"
          className="rounded-full mr-6 self-center"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className="w-5 h-5"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title></title>{" "}
              <g id="Complete">
                {" "}
                <g data-name="add" id="add-2">
                  {" "}
                  <g>
                    {" "}
                    <line
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      x1="12"
                      x2="12"
                      y1="19"
                      y2="5"
                    ></line>{" "}
                    <line
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      x1="5"
                      x2="19"
                      y1="12"
                      y2="12"
                    ></line>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
