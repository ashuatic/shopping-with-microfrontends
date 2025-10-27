import { j as jsxRuntimeExports, E as ErrorBoundary } from './ErrorBoundary-J7vTTAmf.js';

const Button = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: "Button Error" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: `${baseClasses} ${variantClasses[variant]} ${className}`,
      ...props,
      children
    }
  ) });
};

export { Button as default };
