const Nav = () => {
  return (
    <header className="relative flex flex-row py-8 ">
      <div className="flex flex-row gap-x-4 sm:gap-x-12 font-semibold">
        <button>Popular</button>
        <button>New</button>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">Logo</div>
    </header>
  );
};

export default Nav;
