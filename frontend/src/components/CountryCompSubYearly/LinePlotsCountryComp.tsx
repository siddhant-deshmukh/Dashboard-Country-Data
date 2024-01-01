import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { ICountryCompLinearData, ISubjectsInfo } from "../../types";

export default function LinePlot_Country_Comparisons_Yearly({
  subject,
  countriesData,
  years,
  width = 640,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
  startYPoint,
  endYPoint
}: {
  subject: ISubjectsInfo
  years: { start: number, end: number },
  countriesData: ICountryCompLinearData[],
  width?: number
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
  startYPoint?: number
  endYPoint?: number
}) {
  const gx = useRef<SVGGElement | null>(null);
  const gy = useRef<SVGGElement | null>(null);
  const tooltip = useRef<HTMLDivElement | null>(null)
  const tooltipTitle = useRef<HTMLHeadingElement | null>(null)
  // const tooltipDesc = useRef<HTMLParagraphElement | null>(null)
  const height = width * (5 / 8)

  const x = d3.scaleTime([new Date(`${years.start}-01-01`), new Date(`${years.end}-01-01`)], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear([startYPoint ? startYPoint : 0, endYPoint ? endYPoint : 500], [height - marginBottom, marginTop]);

  const line = d3.line((_, i) => x(new Date(`${i + years.start}-01-01`)), y);


  useEffect(() => {
    if (gx.current) {
      d3.select(gx.current)
        .call(d3.axisBottom(x))
        .selectAll(".tick line")
        .attr('stroke', 'lightgray')
        .attr('stroke-width', 1)
        .attr('y2', -1 * 0.9 * height)
      // .attr('y2',-1*height)
    }
  }, [gx, x, width, height]);
  useEffect(() => {
    if (gy.current) {
      d3.select(gy.current)
        .call(d3.axisLeft(y))
        .selectAll(".tick line")
        .attr('stroke', 'lightgray')
        .attr('stroke-width', 1)
        .attr('x2', 0.9 * width)
    }
  }, [gy, y, width, height]);

  // console.log(years, subject.name, countriesData.slice(years.start - 2002, years.end - 2002))

  return (
    <>
      <svg className="bg-light-secondary-0" width={width} height={height}>
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} />
        {
          countriesData.map(({ data: completeData, country, color }) => {

            const data = completeData.slice(years.start - 2002, years.end - 2002)
            
            return <g key={country.code}>
              <path
                fill="none"
                stroke={color}
                opacity={1}
                strokeWidth={(width > 640) ? "4" : "2"}
                d={((line(data) === null) ? "" : line(data)) as string}
                onMouseMove={(event) => {
                  // console.log(event)
                  if (tooltip.current && tooltipTitle.current) {
                    // if (color && color?.slice(0, 1) === "#") {
                    //   // tooltip.current.style.background = "white"
                    //   tooltip.current.style.borderColor = color  // + "70"

                    // } else {
                    //   tooltip.current.style.color = "black"
                    //   // tooltip.current.style.background = "white"
                    //   tooltip.current.style.borderColor = 'gray'
                    // }
                    tooltipTitle.current.style.color = (color) ? color : "black"
                    tooltip.current.style.borderColor = (color) ? color : "gray"
                    // tooltip.current.style.background = "white"
                    tooltip.current.classList.remove('opacity-0')
                    tooltip.current.style.left = event.clientX.toString() + "px"
                    tooltip.current.style.top = event.clientY.toString() + "px"
                    tooltipTitle.current.innerText = country.name
                  }
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (tooltip.current) {
                      tooltip.current.classList.add('opacity-0')
                    }
                  }, 1000)
                }
                }
              />
              <g
                fill={color}
                stroke={color}
                strokeWidth={(width > 640) ? "4" : "2"}>
                {data.map((d, i) => (<circle stroke={color} fill={color} opacity={1} key={i} cx={x(new Date(`${i + years.start}-01-01`))} cy={y(d)} r={width > 640 ? "2.5" : "2"} />))}
              </g>
            </g>
          })
        }
      </svg>
      <div
        ref={tooltip}
        className="fixed z-50 opacity-0 transition-all bg-white duration-200 border rounded-md shadow-lg  p-2">
        <div className="bg-opacity-20">
          <h3
            ref={tooltipTitle}
            style={{
              color: "black",
              WebkitTextStroke: "#000"
            }}
            className="font-bold outline-1"></h3>
          {/* <div className="flex space-x-2 text-sm">
            <span>{subject.name} : </span>
            <p ref={tooltipDesc}></p>
            {
              subject.scale &&
              <span>{subject.scale}</span>
            }
            <span>{subject.units}</span>
          </div> */}
        </div>
      </div>
    </>

  );
}