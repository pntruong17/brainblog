import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import React, { useEffect } from "react";

const BarChartComp = ({ data }) => {
  const key1 = Object.keys(data[0])[0];
  const key2 = Object.keys(data[0])[1];
  useEffect(() => {}, [data]);
  return (
    <>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data} className="text-xs tracking-tighter">
          <XAxis dataKey={key1} />
          <YAxis dataKey={key2} />
          <Tooltip />
          <Bar dataKey={key2} fill="#8855ff" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartComp;
