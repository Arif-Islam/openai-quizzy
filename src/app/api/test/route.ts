import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const game = await prisma.game.create({
      data: {
        gameType: "mcq",
        timeStarted: new Date(),
        userId: "clm2gr33o00007k20gfogmqkf",
        topic: "NextJS",
        questions: [],
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    return NextResponse.json({
      prismaError: error,
    });
  }
};
