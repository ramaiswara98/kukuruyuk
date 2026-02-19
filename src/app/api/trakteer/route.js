import { NextResponse } from 'next/server';

export async function GET() {
   const API_KEY = "trapi-dnsB8a8V5V1vG7zV0DcV4gud";
  const ENDPOINT = "https://api.trakteer.id/v1/public/supports?limit=25";

  try {
    const response = await fetch(ENDPOINT, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'key': API_KEY,
      },
      // Penting: tambahkan cache: 'no-store' agar data selalu fresh
      cache: 'no-store'
    });

    const data = await response.json();
    console.log(data.result.data)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}