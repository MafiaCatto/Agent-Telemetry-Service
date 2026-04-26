import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
export function WorkflowsView() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["workflows"],
        queryFn: api.getWorkflows
    });
    if (isLoading) {
        return _jsx("section", { className: "panel", children: _jsx("p", { children: "Loading workflow history..." }) });
    }
    if (error || !data) {
        return _jsx("section", { className: "panel", children: _jsx("p", { children: "Workflow history unavailable." }) });
    }
    return (_jsxs("section", { className: "stack", children: [_jsx("header", { className: "page-header", children: _jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Workflows" }), _jsx("h2", { children: "Recent runs" })] }) }), _jsx("article", { className: "panel table-panel", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Started" }), _jsx("th", { children: "Duration" }), _jsx("th", { children: "Tokens" }), _jsx("th", { children: "Cost" }), _jsx("th", { children: "Trace" })] }) }), _jsx("tbody", { children: data.map((run) => (_jsxs("tr", { children: [_jsx("td", { children: run.workflowName }), _jsx("td", { children: _jsx("span", { className: `pill ${run.status}`, children: run.status }) }), _jsx("td", { children: new Date(run.startedAt).toLocaleString() }), _jsxs("td", { children: [run.durationMs, " ms"] }), _jsx("td", { children: run.totalTokens.toLocaleString() }), _jsxs("td", { children: ["$", run.estimatedCostUsd.toFixed(3)] }), _jsx("td", { children: _jsx("code", { children: run.traceId }) })] }, run.id))) })] }) })] }));
}
