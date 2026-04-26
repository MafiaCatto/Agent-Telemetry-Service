import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
export function AgentsView() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["agents"],
        queryFn: api.getAgents
    });
    if (isLoading) {
        return _jsx("section", { className: "panel", children: _jsx("p", { children: "Loading agent stats..." }) });
    }
    if (error || !data) {
        return _jsx("section", { className: "panel", children: _jsx("p", { children: "Agent stats unavailable." }) });
    }
    return (_jsxs("section", { className: "stack", children: [_jsx("header", { className: "page-header", children: _jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Agents" }), _jsx("h2", { children: "Reliability by agent" })] }) }), _jsx("div", { className: "metric-grid", children: data.map((agent) => (_jsxs("article", { className: "metric-card", children: [_jsxs("div", { className: "panel-header", children: [_jsx("h3", { children: agent.name }), _jsx("span", { className: `status-badge ${agent.status}`, children: agent.status })] }), _jsxs("p", { children: [agent.toolCallsTotal.toLocaleString(), " tool calls"] }), _jsxs("p", { children: [agent.toolCallsFailed, " failed"] }), _jsxs("p", { children: [agent.avgLatencyMs, " ms average latency"] }), _jsxs("p", { children: [agent.errorRatePct, "% error rate"] })] }, agent.id))) })] }));
}
