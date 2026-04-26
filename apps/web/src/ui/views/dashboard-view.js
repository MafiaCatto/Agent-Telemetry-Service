import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api } from "../../lib/api";
export function DashboardView() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["overview"],
        queryFn: api.getOverview
    });
    if (isLoading) {
        return _jsx("section", { className: "panel", children: _jsx("p", { children: "Loading overview..." }) });
    }
    if (error || !data) {
        return _jsx("section", { className: "panel", children: _jsx("p", { children: "Overview unavailable." }) });
    }
    const metrics = [
        { label: "Workflow runs", value: data.metrics.totalRuns24h.toLocaleString() },
        { label: "Failure rate", value: `${data.metrics.failureRatePct}%` },
        { label: "Budget used", value: `${data.metrics.budgetUsedPct}%` },
        { label: "Avg latency", value: `${data.metrics.avgLatencyMs} ms` }
    ];
    return (_jsxs("section", { className: "stack", children: [_jsxs("header", { className: "page-header", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Overview" }), _jsx("h2", { children: "Operations at a glance" })] }), _jsx("div", { className: `status-badge ${data.systemStatus}`, children: data.systemStatus })] }), _jsx("div", { className: "metric-grid", children: metrics.map((metric) => (_jsxs("article", { className: "metric-card", children: [_jsx("p", { children: metric.label }), _jsx("strong", { children: metric.value })] }, metric.label))) }), _jsxs("article", { className: "panel chart-panel", children: [_jsxs("div", { className: "panel-header", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Trend" }), _jsx("h3", { children: "Throughput and spend" })] }), _jsxs("p", { children: [data.metrics.recentAlerts, " recent alerts"] })] }), _jsx("div", { className: "chart-shell", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: data.trend, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "cost", x1: "0", x2: "0", y1: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#ff7a18", stopOpacity: 0.45 }), _jsx("stop", { offset: "95%", stopColor: "#ff7a18", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#243447" }), _jsx(XAxis, { dataKey: "timestamp", stroke: "#9ab0c7" }), _jsx(YAxis, { stroke: "#9ab0c7" }), _jsx(Tooltip, {}), _jsx(Area, { dataKey: "costUsd", stroke: "#ff7a18", fill: "url(#cost)" })] }) }) })] })] }));
}
