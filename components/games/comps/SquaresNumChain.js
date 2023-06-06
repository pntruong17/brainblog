import SquareNumChain from "./SquareNumChain";
const SquaresNumChain = ({
  id,
  color,
  layer1,
  layer2,
  layer3,
  layer4,
  selected,
  handleSelected,
}) => {
  return (
    <div
      onClick={() => handleSelected(id)}
      className={`w-1/5 h-20 bg-${color} ${
        selected[selected.length - 1] === id ? "border-4 border-red-300" : ""
      } cursor-pointer }`}
    >
      <SquareNumChain
        id={id}
        layer1={layer1}
        layer2={layer2}
        layer3={layer3}
        layer4={layer4}
      />
    </div>
  );
};

export default SquaresNumChain;
