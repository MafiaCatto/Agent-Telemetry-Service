import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/workflows", label: "Workflows" },
    { to: "/agents", label: "Agents" },
    { to: "/alerts", label: "Alerts" },
    { to: "/settings", label: "Settings" }
];
export function AppShell() {
    const pathname = useRouterState({
        select: (state) => state.location.pathname
    });
    return (_jsxs("div", { className: "layout", children: [_jsxs("aside", { className: "sidebar", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Management View" }), _jsx("h1", { children: "Agent Observability" }), _jsx("p", { className: "sidebar-copy", children: "A calm surface for workflow health, agent reliability, and budget drift." })] }), _jsx("nav", { className: "nav", children: navItems.map((item) => (_jsx(Link, { className: pathname === item.to ? "nav-button active" : "nav-button", to: item.to, children: item.label }, item.to))) })] }), _jsx("main", { className: "content", children: _jsx(Outlet, {}) })] }));
}
