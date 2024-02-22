import { IoMdStats } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaBook } from 'react-icons/fa';
import { ImBook } from 'react-icons/im';

const links = [
    {
        id: 1,
        text: "stats",
        path: "/",
        icon: <IoMdStats />,
    },
    {
        id: 2,
        text: "all-books",
        path: "/all-books",
        icon: <ImBook />,
    },
    {
        id: 3,
        text: "add-book",
        path: "/add-book",
        icon: <FaBook />,
    },
    {
        id: 4,
        text: "profile",
        path: "/profile",
        icon: <CgProfile />,
    },
    ];

    export default links;