import Container from "@/components/container";
import React from "react";
import { gamelib } from "@/lib/myapp/gamelib";
import GameCard from "@/components/games/comps/GameCard";

export default function Games() {
  return (
    <Container>
      <div>
        <div className="flex w-full flex-col items-center justify-center pt-3 md:pt-14">
          <h1 className="font-Inter text-center text-3xl font-bold tracking-tight md:text-5xl">
            Game Designed to <br /> train your brain
          </h1>
          <h4 className="font-Inter py-2 text-center text-lg font-medium tracking-tighter md:text-2xl">
            Discover the various cognitive games and exercises
          </h4>
        </div>
        <div className="mx-auto mt-10 grid max-w-[56rem] sm:grid-cols-2 md:grid-cols-3">
          {gamelib.map(game => {
            return (
              <div key={game.id} className="">
                <GameCard
                  gameName={game.Name}
                  gameDesc={game.Desc}
                  gamePhoto={game.PhotoURL}
                  gameSlug={game.Slug}
                  gameColorBG={game.ColorBG}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
