// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function PieChart({ items }: PageProps) {
  const { darkMode } = useSelector((state: RootState) => state);
  const [pieChart, setPieChart] = useState(
    <h1 style={{ textAlign: "center" }}>{items.toString()}</h1>
  );
  useEffect(() => {
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = {
        backgroundColor: "transparent",
        data: [
          {
            type: "pie",
            indexLabelFontColor: darkMode.isDarkMode ? "#A5C9CA" : "black",
            click: function (e: {
              dataSeries: { dataPoints: string | any[] };
              dataPoint: { exploded: boolean };
            }) {
              for (var i = 0; i < e.dataSeries.dataPoints.length; i++) {
                e.dataSeries.dataPoints[i].exploded = false;
              }
              e.dataPoint.exploded = true;
            },
            dataPoints: items,
          },
        ],
      },
      //Styling Chart Container
      containerProps = {
        width: "100%",
        height: "300px",
      };
    setPieChart(
      <CanvasJSChart options={options} containerProps={containerProps} />
    );
  }, [darkMode]);

  return pieChart;
}

type PageProps = {
  items: { label: string; y: number }[];
};
