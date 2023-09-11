import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
// import { getAuthSession } from "@/lib/nextAuth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import axios from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request, res: Response) => {
  try {
    // const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to create a quiz." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }

    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    let questions: any;

    if (type === "open_ended") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
      // console.log('consoled questions', questions);
    } else if (type === "mcq") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "first option with max length of 15 words",
          option2: "second optionwith max length of 15 words",
          option3: "third optionwith max length of 15 words",
        }
      );
    }

    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(error);
    }
  }
};
