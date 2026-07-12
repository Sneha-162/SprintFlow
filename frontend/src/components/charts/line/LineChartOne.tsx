import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function LineChartOne() {
  const options: ApexOptions = {
    legend: {
      show: true, // Enable legend visibility to distinguish tracker items
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    colors: ["#465FFF", "#9CB9FF"], 
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line", 
      toolbar: {
        show: false, 
      },
    },
    stroke: {
      curve: "smooth", // Smooth styling fits timeline trends much better
      width: [2, 2], 
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, 
      strokeColors: "#fff", 
      strokeWidth: 2,
      hover: {
        size: 6, 
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, 
        },
      },
      yaxis: {
        lines: {
          show: true, 
        },
      },
    },
    dataLabels: {
      enabled: false, 
    },
    tooltip: {
      enabled: true, 
      x: {
        show: true,
      },
      y: {
        formatter: (val: number) => `${val} Items`,
      },
    },
    xaxis: {
      type: "category", 
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false, 
      },
      axisTicks: {
        show: false, 
      },
      tooltip: {
        enabled: false, 
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px", 
          colors: ["#6B7280"], 
        },
      },
      title: {
        text: "", 
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Active Sprints",
      data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
    },
    {
      name: "Completed Epics",
      data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartEight" className="min-w-[1000px]">
        <Chart options={options} series={series} type="area" height={310} />
      </div>
    </div>
  );
}