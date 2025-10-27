import { j as jsxRuntimeExports, E as ErrorBoundary } from './ErrorBoundary-J7vTTAmf.js';

const Card = ({
  title,
  description,
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white rounded-xl shadow-lg p-6 ${className}`, children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 mb-2", children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-red-50 border border-red-200 rounded text-sm text-red-600", children: "Error rendering card content" }), children })
  ] });
};

export { Card as default };
