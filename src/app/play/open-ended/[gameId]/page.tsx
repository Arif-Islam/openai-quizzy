import OpenEnded from "@/components/OpenEnded";
import { toast } from "@/components/ui/use-toast";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
  });

  if (!game) {
    toast({
      title: "Failed to generate questions. Please try again after a minute.",
      description: "OpenAI API failed to generate any question for you.",
      variant: "destructive",
    });
    return redirect("/quiz");
  } else if (game.gameType !== "open_ended") {
    return redirect("/quiz");
  }

  return <OpenEnded game={game} />;
};

export default OpenEndedPage;
