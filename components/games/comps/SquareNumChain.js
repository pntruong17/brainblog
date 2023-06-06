const SquareNumChain = ({ id, layer1, layer2, layer3, layer4 }) => {
  return (
    <div className="grid grid-cols-2 gap-1">
      <div className="m-2 rounded-md text-center font-bold">{layer1[id]}</div>
      <div className="m-2 rounded-md text-center font-bold">{layer2[id]}</div>
      <div className="m-2 rounded-md text-center font-bold">{layer3[id]}</div>
      <div className="m-2 rounded-md text-center font-bold">{layer4[id]}</div>
    </div>
  );
};

export default SquareNumChain;
