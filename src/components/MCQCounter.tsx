import React from "react";
import { Card } from "./ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  correntAnswers: number;
  wrongAnswers: number;
};

const MCQCounter = ({ correntAnswers, wrongAnswers }: Props) => {
  return (
    <div>
      <Card className="flex flex-row items-center justify-center p-2">
        <CheckCircle2 color="green" size={30} />
        <span className="mx-3 text-2xl text-[green]">{correntAnswers}</span>

        <Separator orientation="vertical" />

        <span className="mx-3 text-2xl text-[red]">{wrongAnswers}</span>
        <XCircle color="red" size={30} />
      </Card>
    </div>
  );
};

export default MCQCounter;
