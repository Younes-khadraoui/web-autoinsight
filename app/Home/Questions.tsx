import React from "react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface card {
  question: string;
  answer: string;
}

const cards: card[] = [
  {
    question: "What is Autoinsight",
    answer:
      "Autoinsight is a package designed to expedite the process of building analyses, machine learning models, and reports for data scientists and analysts. By leveraging the power of Large Language Models (LLMs)",
  },
  {
    question: "What is Meow",
    answer: "meow meow",
  },
  {
    question: "What is Dog",
    answer: "woof woof",
  },
];

const Questions = () => {
  return (
    <div className="p-10 pb-20 lg:p-56 lg:pt-10">
      <p className="font-bold text-5xl pb-10 text-center">
        Frequently asked <br />
        Questions ?
      </p>
      <div className="px-32">
        <Carousel
          className="bg-second px-10 py-20 rounded-2xl border-4"
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent>
            {cards.map((card, index) => (
              <CarouselItem key={index}>
                <p className="font-bold text-2xl pb-2">{card.question}</p>
                <p className="text-lg">{cards[index].answer}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-black" />
          <CarouselNext className="text-black" />
        </Carousel>
      </div>
    </div>
  );
};

export default Questions;
