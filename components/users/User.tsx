"use client";
import { createUser, getAllUsers } from "@/actions/user.actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Customer {
  id: string;
  customerId: string;
  customerName: string;
  numberOfOrders: number;
}

interface UsersData {
  customers: Customer[];
}

function User() {
  const [users, setUsers] = useState<UsersData>({ customers: [] });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const getAllUsersData = async () => {
    const res = await getAllUsers();
    console.log(res);
    setUsers(res);
  };
  useEffect(() => {
    getAllUsersData();
  }, []);

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await createUser(Email, Name);
      if (res?.success) {
        getAllUsersData();
        setEmail("");
        setName("");
        setErrMsg("");
        setLoading(false);
      } else {
        setErrMsg(res?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(errMsg);
  return (
    <div>
      <Link className=" text-[28px] font-bold" href="/">
        Home
      </Link>

      <div className=" flex justify-between p-8">
        <form
          className=" flex flex-col items-center gap-4 bg-slate-300 border-[1px] border-black drop-shadow-2xl p-8 "
          onSubmit={onHandleSubmit}
        >
          <p className=" text-red-600">{errMsg !== "" ? errMsg : ""}</p>
          <div className=" flex flex-col gap-2">
            <label>Name</label>
            <input
              placeholder="Enter CUstomer's Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className=" flex flex-col gap-2">
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className=" bg-blue-950 disabled:bg-gray-500 text-white w-[150px] h-[32px] flex justify-center items-center rounded-md"
          >
            Create Customer
          </button>
        </form>

        <p>{users?.customers?.length} users</p>
      </div>
      <div className="w-full max-w-6xl overflow-x-auto bg-white shadow-md rounded-b-md">
        {" "}
        <table className="min-w-full table-auto text-sm text-left">
          <thead>
            <tr className="bg-[#1E3A8A] text-white">
              <th className="px-6 py-4 font-medium">Customer ID</th>
              <th className="px-6 py-4 font-medium">Customer Name </th>
              <th className="px-6 py-4 font-medium">Numbers of Orders</th>
            </tr>
          </thead>
          <tbody className="max-h-[70vh] h-[70vh] overflow-auto">
            {users?.customers?.map((user: Customer) => {
              return (
                <tr key={user?.customerId}>
                  <td className="px-6 py-4 border-b">{user?.customerId}</td>
                  <td className="px-6 py-4 border-b">{user?.customerName}</td>
                  <td className="px-6 py-4 border-b">{user?.numberOfOrders}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
