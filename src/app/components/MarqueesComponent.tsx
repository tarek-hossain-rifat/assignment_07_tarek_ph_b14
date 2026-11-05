import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface MarqueeType {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const MarqueesComponent = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const fullData = await res.json();

  // Handle both direct array and { data: [] } response
  const data: MarqueeType[] = Array.isArray(fullData)
    ? fullData
    : Array.isArray(fullData.data)
      ? fullData.data
      : [];

  return (
    <div className="flex flex-row items-center justify-center border-t border-b text-sm bg-white">
      <div className="flex flex-row items-center w-full">
        <MarqueeText direction="right" duration={25}>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <span className="py-2 inline-flex items-center whitespace-nowrap border-l border-r px-2">
                {item.categoryIcon}
                {item.nameBn} - {item.today.toLocaleString("bn-BD")} {"টাকা/"}
                {item.unit === "kg" ? "কেজি" : item.unit}
                <span
                  className={
                    item.change?.dir === "down"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {item.change?.dir === "down" ? "▼" : "▲"}
                  {Math.abs(item.change?.pct ?? 0).toLocaleString("bn-BD")}%
                </span>
              </span>
            </React.Fragment>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default MarqueesComponent;
