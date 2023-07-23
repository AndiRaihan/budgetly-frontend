import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PieChart({ items }: PageProps) {
  let chart;
  const options = {
      backgroundColor: "transparent",
      data: [
        {
          type: "pie",
          click: function (e) {
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

  return (
    <CanvasJSChart
      options={options}
      onRef={(ref: any) => (chart = ref)} //Reference to the chart-instance
      containerProps={containerProps}
    />
  );
}

type PageProps = {
  items: { label: string; y: number }[];
};
