import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";

const Nav = (props) => {
  const {
    sort = undefined,
    changeSort = undefined,
    hideButtons = false,
    white = false,
  } = props;

  return (
    <header
      className={`relative grid grid-cols-3 justify-between pt-8 pb-16 ${
        white ? "bg-white" : ""
      }`}
    >
      <div
        className={`flex-row gap-x-3 sm:gap-x-6 font-semibold col-start-1 ${
          hideButtons ? "hidden" : "flex"
        }`}
      >
        <button
          onClick={() => changeSort("popular")}
          className={`${
            sort == "popular"
              ? "text-white bg-watermelon rounded-lg px-4 py-1 focus:outline-watermelon-dark"
              : "px-4 py-1"
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => changeSort("new")}
          className={`${
            sort == "new"
              ? "text-white bg-watermelon rounded-lg px-4 py-1 focus:outline-watermelon-dark"
              : "px-4 py-1"
          }`}
        >
          New
        </button>
      </div>
      <div className="col-start-2 text-center justify-center">
        <Link href="/">
          <Image src={Logo} className="inline-block" alt="Logo" />
        </Link>
      </div>
      <div className={`${hideButtons ? "hidden" : "flex"} col-start-3`}></div>
    </header>
  );
};

export default Nav;
