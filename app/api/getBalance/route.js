import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://toncenter.com/api/v2/getAddressInformation?address=${address}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch balance from TON API");
    }

    const data = await response.json();
    return NextResponse.json({ balance: data?.result?.balance });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
