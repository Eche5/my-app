"use client";
import { getALLOrders } from "@/actions/orders.action";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

interface Order {
  id: string;
  OrderID: number;
  TotalAmount: number;
  OrderDate: string;
}

interface OrderData {
  orders: Order[];
}
function Orders() {
  const [order, setOrders] = useState<OrderData>({ orders: [] });
  const [totalrevenue, setTotalRevenue] = useState("");
  const getAllOrderData = async () => {
    const res = await getALLOrders();
    setOrders(res);
  };
  useEffect(() => {
    getAllOrderData();
  }, []);

  useEffect(() => {
    if (order?.orders.length > 0) {
      const total = order?.orders
        ?.reduce((sum, item) => sum + item.TotalAmount, 0)
        .toFixed(2);
      setTotalRevenue(total);
    }
  }, [order]);

  const formatDate = (date: string) => {
    const newdate = new Date(date);
    const formattedDate = format(newdate, "M/d/yyyy");
    return formattedDate;
  };

  if (order?.orders?.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" p-8 flex flex-col items-center">
      <div className=" flex justify-between w-full max-w-6xl items-center">
        <h3> orders</h3>
        <p>$ {totalrevenue.toLocaleString()}</p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-full max-w-6xl overflow-x-auto bg-white shadow-md rounded-b-md">
          <table className="min-w-full table-auto text-sm text-left">
            <thead>
              <tr className="bg-[#1E3A8A] text-white">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Order Date</th>
                <th className="px-6 py-4 font-medium">TotalAmount</th>
              </tr>
            </thead>
            <tbody className="max-h-[70vh] h-[70vh] overflow-auto">
              {order?.orders?.map((order: Order) => {
                return (
                  <tr key={order?.OrderID}>
                    <td className="px-6 py-4 border-b">{order?.OrderID}</td>
                    <td className="px-6 py-4 border-b">
                      {formatDate(order?.OrderDate)}{" "}
                    </td>
                    <td className="px-6 py-4 border-b">{order?.TotalAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
