import FastMatch from "@/components/games/FastMatch";
import MathGame from "@/components/games/MathGame";
import MemoryCardGame from "@/components/games/MemoryCardGame";
import FoodCollection from "@/components/games/FoodCollection";
import StarSearch from "@/components/games/StarSearch";
import Wordle from "@/components/games/Wordle";

export const gamelib = [
  {
    id: "braingame000",
    Group: "Math",
    Name: "Math Game",
    Slug: "math-game",
    Desc: "Improve your mental math skills and enhance your speed and accuracy with this fast-paced calculation game!",
    Howplayed:
      "You are a quick thinker in math. Choose whether the calculation on the left or right side is greater or equal. Test your speed and accuracy in solving these equations!",
    PhotoURL: "/static/games/mathgame.png",
    ColorBG: "bg-_blue",
    Game: <MathGame />
  },
  {
    id: "braingame001",
    Group: "Memory",
    Name: "Memory Cards",
    Slug: "memory-card",
    Desc: "Boost your memory and concentration skills with this fun and challenging memory card game!",
    Howplayed:
      "This game may be familiar to you. Flip the cards over and find matching pairs. Test your memory and see how many pairs you can match before the time runs out!",
    PhotoURL: "/static/games/memorycard.png",
    ColorBG: "bg-_yellow",
    Game: <MemoryCardGame />
  },
  {
    id: "braingame002",
    Group: "Memory",
    Name: "Collect Food",
    Slug: "collect-food",
    Desc: "Enhance your memory and focus with this engaging and stimulating brain game!",
    Howplayed:
      "Remember the foods you selected previously. Do not repeat your choices, or the game will end. Test your memory and see how many rounds you can successfully complete!",
    PhotoURL: "/static/games/foodcollection.png",
    ColorBG: "bg-_pink",
    Game: <FoodCollection />
  },
  {
    id: "braingame003",
    Group: "Speed",
    Name: "Fast Match",
    Slug: "fast-match",
    Desc: "Speed Match exercises your brain’s ability to process information quickly and and accurately.",
    Howplayed:
      "Quickly select whether the current emoji icon you are viewing matches the previous one. Pay attention to the details and make your choice before time runs out!",
    PhotoURL: "/static/games/fastmatch.png",
    ColorBG: "bg-_orange",
    Game: <FastMatch />
  },
  {
    id: "braingame004",
    Group: "Attention",
    Name: "Diamond Search",
    Slug: "diamond-search",
    Desc: "Sharpen your concentration and improve your focus with this engaging game designed to boost your cognitive skills!",
    Howplayed:
      "Find the one and only diamond in this game! Search carefully, explore every corner, and don't give up until you find it. Start your adventure now!",
    PhotoURL: "/static/games/diamondsearching.png",
    ColorBG: "bg-_green",
    Game: <StarSearch />
  },
  {
    id: "braingame005",
    Group: "Language",
    Name: "Wordl",
    Slug: "wordl",
    Desc: "Wordle is a popular online word-guessing game where players must guess a five-letter word in six attempts. It's fun, challenging, and educational.",
    Howplayed:
      "Choose a five-letter word to guess. Make six attempts to guess the word. Each guess will show which letters are correct or in the wrong position. Use process of elimination and logic to guess the word. Guess the word before running out of attempts to win!",
    PhotoURL: "/static/games/wordlle.png",
    ColorBG: "bg-_dark",
    Game: <Wordle />
  }
];

export function getAllGameSlugs() {
  const slugs = gamelib.map(game => game.Slug);
  return slugs;
}
export function getGameBySlug(slug) {
  const game = gamelib.find(game => game.Slug === slug);
  return game.Game;
}
