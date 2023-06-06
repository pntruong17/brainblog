import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import React from "react";

const BarChartVerticle = ({ data }) => {
  const key1 = Object.keys(data[0])[0];
  const key2 = Object.keys(data[0])[1];

  return (
    <>
      <ResponsiveContainer width={"100%"} height={500}>
        <BarChart width={600} height={300} data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey={key1} type="category" />
          <Tooltip />
          <Bar dataKey={key2} barSize={40} fill="#8855ff" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartVerticle;
