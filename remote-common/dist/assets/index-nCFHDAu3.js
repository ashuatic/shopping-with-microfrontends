import { importShared } from './__federation_fn_import-gVVR6EuA.js';
import { j as jsxRuntimeExports, E as ErrorBoundary } from './ErrorBoundary-J7vTTAmf.js';
import { r as reactDomExports } from './index-D9Af7wOI.js';
import Button from './__federation_expose_Button-CSjPNxMK.js';
import Card from './__federation_expose_Card-DTPVGrrQ.js';

true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl w-full space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-center text-gray-800", children: "Common UI Components" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-600", children: "This remote provides reusable UI components" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          title: "Button Component Demo",
          description: "Reusable button component with variants",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-x-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => alert("Primary clicked!"), children: "Primary Button" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => alert("Secondary clicked!"),
                variant: "secondary",
                children: "Secondary Button"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          title: "Card Component Demo",
          description: "Reusable card component with header and content",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "These components can be imported and used in any microfrontend." })
        }
      )
    ] })
  ] }) }) });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
