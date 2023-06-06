"use client";
import React, { useEffect, useState } from "react";
import { getGameBySlug } from "@/lib/myapp/gamelib";
import PregameModal from "@/components/games/comps/PregameModal";
import Container from "@/components/container";

export default function Game({ params }) {
  const game = getGameBySlug(params.game);
  const [visibleModal, setVisibleModal] = useState(false);

  const [mygame, setMygame] = useState(game);
  useEffect(() => {
    setMygame(game);
  }, [game]);
  return (
    <>
      <Container>
        {mygame && (
          <PregameModal
            nameGame={mygame.Name}
            gameDesc={mygame.Desc}
            Howplayed={mygame.Howplayed}
            colorBG={mygame.ColorBG}
            photoURL={mygame.PhotoURL}
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
          />
        )}
        <div>{mygame && <div>{mygame}</div>}</div>
      </Container>
    </>
  );
}
