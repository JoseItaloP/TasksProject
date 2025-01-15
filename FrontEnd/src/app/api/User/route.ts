import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { IDuser } = await request.json();

    if (IDuser) {
      console.log("ID do usuário recebido:", IDuser);

      const response = NextResponse.json({ success: true });
      response.cookies.set("UserID", IDuser, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "ID do usuário não fornecido" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
