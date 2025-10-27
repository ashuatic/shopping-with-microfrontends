import { importShared } from './__federation_fn_import-gVVR6EuA.js';
import { j as jsxRuntimeExports, E as ErrorBoundary } from './ErrorBoundary-BLu9fAmX.js';

const remotesMap = {
'remoteCommon':{url:'http://localhost:5172/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'react':{'undefined':{get:()=>get(new URL('__federation_shared_react-BCcI129A.js', import.meta.url).href), loaded:1}},'react-dom':{'undefined':{get:()=>get(new URL('__federation_shared_react-dom-BhMZJInU.js', import.meta.url).href), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule();
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const {lazy,Suspense} = await importShared('react');
const Button = lazy(() => __federation_method_getRemote("remoteCommon" , "./Button").then(module=>__federation_method_wrapDefault(module, true)));
const Card = lazy(() => __federation_method_getRemote("remoteCommon" , "./Card").then(module=>__federation_method_wrapDefault(module, true)));
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-800", children: "Welcome to the Home Page" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-gray-600", children: [
        "This is a remote microfrontend loaded from ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-gray-200 px-2 py-1 rounded", children: "remote-home" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse bg-gray-200 h-64 rounded-xl" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          title: "Card Component",
          description: "This card is loaded from the remote-common microfrontend",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: "This demonstrates how components from different remotes can work together seamlessly." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ErrorBoundary,
              {
                fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-gray-100 rounded text-sm text-gray-600", children: "Button unavailable" }),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse bg-gray-300 h-10 rounded" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => alert("Button clicked!"), children: "Click Me" }) })
              }
            )
          ] })
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse bg-gray-200 h-64 rounded-xl" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          title: "Another Card",
          description: "Module Federation allows sharing components across applications",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: "Each microfrontend can be developed, deployed, and updated independently." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ErrorBoundary,
              {
                fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-gray-100 rounded text-sm text-gray-600", children: "Button unavailable" }),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse bg-gray-300 h-10 rounded" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => alert("Hello from the remote button!"),
                    variant: "secondary",
                    children: "Learn More"
                  }
                ) })
              }
            )
          ] })
        }
      ) }) })
    ] })
  ] });
}

export { Home as default };
