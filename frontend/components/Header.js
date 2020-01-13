import React from "react";
import Link from "next/link";
import Nav from "./Nav";

const Header = () => {
  return (
    <div>
      <div className="bar">
        <Link href="/">
          <a>Sick Fits</a>
        </Link>
        <nav>
          <Nav />
        </nav>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </div>
  );
};

export default Header;
