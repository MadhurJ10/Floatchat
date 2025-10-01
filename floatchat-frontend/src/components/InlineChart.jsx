import Plot from "react-plotly.js"

export default function InlineChart({ data }) {
  if (!data?.x || !data?.y) return <span className="text-red-600">Invalid chart data</span>

  return (
    <Plot
      data={[{ x: data.x, y: data.y, type: "scatter", mode: "lines+markers" }]}
      layout={{ autosize: true, margin: { t: 0, b: 20 } }}
      style={{ width: "100%", height: "200px" }}
    />
  )
}
