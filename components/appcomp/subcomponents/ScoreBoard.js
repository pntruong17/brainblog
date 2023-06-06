import { useEffect, useState } from "react";

const ScoreBoard = ({
  idTrivia,
  closeButton,
  winstreak,
  timeBonusStack,
  correct,
  pointCookies,
  setShowScoreBoard
}) => {
  const CLASS = [
    { title: "Reincarnate", points: 0 },
    { title: "Preschool", points: 2000 },
    { title: "Elementary School", points: 8000 },
    { title: "Middle School", points: 16000 },
    { title: "High School", points: 32000 },
    { title: "Bachelor's Degree", points: 64000 },
    { title: "Master's Degree", points: 120000 },
    { title: "Doctorate Degree", points: 240000 },
    { title: "Professor", points: 500000 },
    { title: "God", points: 1000000 },
    { title: "Creative Muse", points: 2000000 }
  ];
  const [trigger, setTrigger] = useState(false);
  const [percent, setPercent] = useState([]);
  const [levelPlayer, setLevelPlayer] = useState({
    title: "",
    nextTitle: "",
    percent: 0,
    xpNeeded: 0
  });

  const STATE = [];
  const radius = 65;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const offset1 = circumference - levelPlayer.percent * circumference;
  const offset2 = circumference - levelPlayer.percent * circumference;

  const calculateLevelPlayer = () => {
    const _index = CLASS.findIndex(
      item => item.points > pointCookies
    );

    if (_index >= 0) {
      const rangePoints =
        CLASS[_index].points - CLASS[_index - 1].points;
      const nextPoint = pointCookies - CLASS[_index - 1].points;
      const percentage = nextPoint / rangePoints;

      setLevelPlayer({
        ...levelPlayer,
        title: CLASS[_index - 1].title,
        nextTitle: CLASS[_index].title,
        percent: percentage,
        xpNeeded: CLASS[_index].points - pointCookies
      });
    } else {
      setLevelPlayer({
        ...levelPlayer,
        title: "Creative Muse",
        nextTitle: "Creative Muse",
        percent: 1,
        xpNeeded: 0
      });
    }
  };

  useEffect(() => {
    calculateLevelPlayer();
  }, []);
  return (
    <>
      <div className="relative mx-auto h-auto max-w-[380px] rounded-2xl border-b-8 border-gray-400/[0.2] bg-amber-100 px-2 pb-3 pt-16">
        <div className="absolute -top-[20px] flex items-center justify-center rounded-lg border-b-8 border-blue-500/[0.9] bg-blue-400 text-4xl font-bold text-white xs:left-[22%] sm:-top-[35px] sm:left-[75px] sm:h-[80px] sm:w-[230px]">
          Score Board
        </div>
        {winstreak && (
          <div className="text-_green mx-auto mb-2 flex h-[68px] max-w-[280px] items-center justify-between rounded-md border-b-4 bg-white p-2 shadow-lg">
            <h3 className="text-xl font-bold tracking-tight">
              Win Streak{" "}
            </h3>
            <h3 className="text-xl font-bold tracking-tight">
              {winstreak}
            </h3>
          </div>
        )}
        {timeBonusStack && (
          <div className="text-_accent mx-auto mb-2 flex h-[68px] max-w-[280px] items-center justify-between rounded-md border-b-4 bg-white p-2 shadow-lg">
            <h3 className="text-xl font-bold tracking-tight">
              Timer Bonus{" "}
            </h3>
            <h3 className="text-xl font-bold tracking-tight">
              {timeBonusStack}
            </h3>
          </div>
        )}
        {correct && (
          <div className="text-_w_almost mx-auto mb-2 flex h-[68px] max-w-[280px] items-center justify-between rounded-md border-b-4 bg-white p-2 shadow-lg">
            <h3 className="text-xl font-bold tracking-tight">
              Correct{" "}
            </h3>
            <h3 className="text-xl font-bold tracking-tight">
              {correct}
            </h3>
          </div>
        )}
        <div className="text-_red mx-auto mb-2 flex h-[68px] max-w-[280px] items-center justify-between rounded-md border-b-4 bg-white p-2 shadow-lg">
          <h3 className="text-2xl font-black tracking-tight">
            Neurons Point:{" "}
          </h3>
          <h3 className="text-2xl font-black tracking-tight">
            +
            {(winstreak ?? 0) +
              (timeBonusStack ?? 0) +
              (correct ?? 0)}
          </h3>
        </div>
        <h4 className="text-_bg_dark pt-3 text-center text-xl font-bold tracking-tight">
          Your level: <span>{levelPlayer.title}</span>
        </h4>
        <div className="mx-auto h-40 w-40">
          {levelPlayer.percent !== undefined && (
            <svg transform="rotate(-90)" width={200} height={200}>
              <circle
                cx={123}
                cy={80}
                r={50}
                fill="none"
                stroke="#ccc"
                strokeWidth={10}
                strokeDasharray={314}
                strokeDashoffset={0}
              />
              <circle
                cx={123}
                cy={80}
                r={50}
                fill="none"
                stroke="#0f0"
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={
                  circumference -
                  ((levelPlayer.percent * 2.3) / 3) * circumference
                }
              />
            </svg>
          )}
        </div>
        <h4
          onClick={() => setTrigger(!trigger)}
          className="text-_bg_dark p-2 text-center text-base font-semibold tracking-tight">
          {levelPlayer.title === CLASS[10].title
            ? "You reached max level!!!"
            : `${levelPlayer.xpNeeded} Neurons needed to reach next level - ${levelPlayer.nextTitle}`}
        </h4>
        {closeButton && (
          <div className="flex w-full justify-center">
            <button
              onClick={() => setShowScoreBoard(false)}
              className="text-_bg_dark border-_bg_dark rounded-full border p-1 font-black">
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ScoreBoard;
