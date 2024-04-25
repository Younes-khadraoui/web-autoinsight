import React from "react";

const Footer = () => {
  return (
    <div className=" bg-second">
      <div className="border-b p-10 flex justify-around">
        <p>Home</p>
        <p>Contact</p>
        <p>About</p>
      </div>
      <div className="p-10">
        <p className="text-center text-third">Copyright &copy; 2023</p>
      </div>
    </div>
  );
};

export default Footer;
