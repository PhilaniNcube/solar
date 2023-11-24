import { NextResponse } from "next/server"


export async function GET(request: Request) {

  const url = new URL(`https://passyunkavenue.com/wp-json/wc/v3/products`)

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
  const products = await response.json()

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(products)
}
