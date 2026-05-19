import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { formatTimestamp } from "../../lib/format";
export function AlertsView() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["alerts"],
        queryFn: api.getAlerts
    });
    if (isLoading) {
        return _jsx("section", { className: "panel", children: _jsx("p", { children: "Loading alert rules..." }) });
    }
    if (error || !data) {
        return _jsx("section", { className: "panel", children: _jsx("p", { children: "Alert rules unavailable." }) });
    }
    return (_jsxs("section", { className: "stack", children: [_jsx("header", { className: "page-header", children: _jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Alerts" }), _jsx("h2", { children: "Notification rules" })] }) }), _jsx("div", { className: "stack", children: data.map((alert) => (_jsxs("article", { className: "panel alert-card", children: [_jsxs("div", { className: "panel-header", children: [_jsxs("div", { children: [_jsx("h3", { children: alert.name }), _jsxs("p", { children: [alert.metric, " ", alert.operator, " ", alert.threshold] })] }), _jsx("span", { className: `pill ${alert.severity}`, children: alert.severity })] }), _jsx("p", { children: alert.active ? "Active" : "Paused" }), _jsxs("p", { children: ["Channels: ", alert.notifyChannels.join(", ")] }), _jsxs("p", { children: ["Last triggered: ", formatTimestamp(alert.lastTriggeredAt)] })] }, alert.id))) })] }));
}
