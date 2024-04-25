import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex text-xl justify-between py-6 px-20 border-b fixed w-full backdrop-blur-sm">
      <div className="font-bold text-2xl">Autoinsight</div>
      <div className="flex gap-8 text-third ">
        <Link href="/">
          <p className="hover:text-white">Home</p>
        </Link>
        <Link href="/">
          <p className="hover:text-white">Docs</p>
        </Link>
        <Link href="/">
          <p className="hover:text-white">Playground</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
