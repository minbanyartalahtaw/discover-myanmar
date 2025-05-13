"use client"
import * as React from "react"
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface PieChartProps {
    data: Array<{
        name: string
        value: number
        color: string
    }>
    title?: string
    subtitle?: string
    width?: number | string
    height?: number | string
    innerRadius?: number
    outerRadius?: number
    showLegend?: boolean
    showTooltip?: boolean
}

export function CustomPieChart({
    data,
    title = "Pie Chart",
    subtitle,
    width = "100%",
    height = 400,
    innerRadius = 60,
    outerRadius = 80,
    showLegend = true,
    showTooltip = true,
}: PieChartProps) {
    const total = React.useMemo(() => {
        return data.reduce((sum, item) => sum + item.value, 0)
    }, [data])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="rounded-lg bg-background p-3 shadow-lg ring-1 ring-border">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-muted-foreground">
                        Value: {data.value.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">
                        Share: {((data.value / total) * 100).toFixed(1)}%
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="w-full p-4">
            {title && (
                <div className="mb-4 text-center">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                    )}
                </div>
            )}
            <ResponsiveContainer width={width} height={height}>
                <PieChart>
                    {showTooltip && <Tooltip content={<CustomTooltip />} />}
                    {showLegend && (
                        <Legend
                            layout="horizontal"
                            align="center"
                            verticalAlign="bottom"
                            className="text-sm"
                        />
                    )}
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <Label
                            value={total.toLocaleString() + " Posts"}
                            position="center"
                            className="text-[14px] sm:text-base md:text-lg lg:text-xl font-semibold"
                            style={{
                                fill: '#000',
                                fontSize: '1rem',
                                fontWeight: 600,
                            }}
                        />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

// Example usage:
const sampleData = [
    { name: "Chrome", value: 275, color: "#4285F4" },
    { name: "Firefox", value: 287, color: "#FF7139" },
    { name: "Safari", value: 200, color: "#000000" },
    { name: "Edge", value: 173, color: "#0078D7" },
    { name: "Other", value: 190, color: "#7B7B7B" },
]

export function Component() {
    return (
        <CustomPieChart
            data={sampleData}
            title="Browser Usage Statistics"
            subtitle="January - June 2024"
            showLegend
            showTooltip
        />
    )
}
