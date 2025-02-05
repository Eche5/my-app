import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" flex items-center gap-2">
        <Link href="/users">
          <button className=" w-[200px] h-[40px] rounded-md bg-black text-white">
            Users
          </button>
        </Link>
        <Link href="/orders">
          <button className=" w-[200px] h-[40px] rounded-md bg-black text-white">
            Orders
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
