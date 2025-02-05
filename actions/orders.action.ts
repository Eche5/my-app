"use server";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log(BACKEND_URL);
export const getALLOrders = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/order/orders`);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (order_id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/order/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id }),
    });
    if (!response.ok) {
      throw new Error("failed to fetch order");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrder = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/order/customer_order`);
    if (!response.ok) {
      throw new Error("failed to fetch user order");
    }
  } catch (error) {
    console.log(error);
  }
};
