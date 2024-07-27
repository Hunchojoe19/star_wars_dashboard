import first from "../src/assets/first.png";
import second from "../src/assets/second.png";
import third from "../src/assets/third.png";
import { BsFillGridFill } from "react-icons/bs";

export const headerData = [
  {
    id: 1,
    title: "overview",
    icon: <BsFillGridFill className="text-white w-6 h-6" />,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "starships",
    icon: `${first}`,
    link: "/starships",
  },
  {
    id: 3,
    title: "people",
    icon: `${second}`,
    link: "/people",
  },
  {
    id: 4,
    title: "species",
    icon: `${third}`,
    link: "/species",
  },
];
