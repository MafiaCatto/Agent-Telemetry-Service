import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
export function SettingsView() {
    const { data } = useQuery({
        queryKey: ["meta"],
        queryFn: api.getMeta
    });
    return (_jsxs("section", { className: "stack", children: [_jsx("header", { className: "page-header", children: _jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Settings" }), _jsx("h2", { children: "Environment posture" })] }) }), _jsxs("article", { className: "panel", children: [_jsx("div", { className: "panel-header", children: _jsxs("div", { children: [_jsx("h3", { children: "SigNoz connection" }), _jsx("p", { children: "Primary engineering drill-down remains in SigNoz. This app stays focused on management-facing views." })] }) }), _jsx("p", { children: "Configure API credentials, default time windows, retention expectations, and deep-link targets here next." }), data ? (_jsxs("div", { className: "details-grid", children: [_jsxs("div", { className: "detail-item", children: [_jsx("span", { className: "detail-label", children: "Data source" }), _jsx("strong", { children: data.dataSource })] }), _jsxs("div", { className: "detail-item", children: [_jsx("span", { className: "detail-label", children: "Default lookback" }), _jsxs("strong", { children: [data.defaultLookbackHours, " hours"] })] })] })) : null] }), _jsx("article", { className: "panel", children: _jsx("div", { className: "panel-header", children: _jsxs("div", { children: [_jsx("h3", { children: "Transform service" }), _jsx("p", { children: "Keep this disabled until management reporting requires a separate business-metrics schema." })] }) }) })] }));
}
