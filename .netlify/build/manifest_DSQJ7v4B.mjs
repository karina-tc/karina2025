import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_P9WmDoNf.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/karina/Desktop/newkt/karina2025/","adapterName":"@astrojs/netlify","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"thoughts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/thoughts","isIndex":false,"type":"page","pattern":"^\\/thoughts\\/?$","segments":[[{"content":"thoughts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/thoughts.astro","pathname":"/thoughts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/karina/Desktop/newkt/karina2025/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/karina/Desktop/newkt/karina2025/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/karina/Desktop/newkt/karina2025/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/karina/Desktop/newkt/karina2025/src/pages/thoughts.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/thoughts@_@astro":"pages/thoughts.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DSQJ7v4B.mjs","/Users/karina/Desktop/newkt/karina2025/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DAcp8MRK.mjs","/Users/karina/Desktop/newkt/karina2025/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.Z-Y11cQO.js","/Users/karina/Desktop/newkt/karina2025/src/components/Greeting.astro?astro&type=script&index=0&lang.ts":"_astro/Greeting.astro_astro_type_script_index_0_lang.BKJulbEC.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/karina/Desktop/newkt/karina2025/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","const t=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&r.target.classList.add(\"visible\")})},{threshold:.1,rootMargin:\"50px\"});document.querySelectorAll(\".content-section\").forEach(e=>{t.observe(e)});"],["/Users/karina/Desktop/newkt/karina2025/src/components/Greeting.astro?astro&type=script&index=0&lang.ts","const r=\"greeting\",n={container:document.querySelector(`[data-${r}-target=\"container\"]`),text:document.querySelector(`[data-${r}-target=\"text\"]`),sunIcon:document.querySelector(`[data-${r}-target=\"sunIcon\"]`),moonIcon:document.querySelector(`[data-${r}-target=\"moonIcon\"]`)};function a(){const t=new Date,e=t.getHours();let o;e<5?o=5:e<12?o=12:e<18?o=18:o=29;const i=new Date(t);return i.setHours(o,0,0,0),i.getTime()-t.getTime()}function s(){const t=new Date().getHours();let e;t>=5&&t<12?e=\"morning\":t>=12&&t<18?e=\"afternoon\":e=\"night\",n.container&&n.text&&(n.container.setAttribute(\"data-greeting-time\",e),n.text.textContent=e===\"morning\"?\"Morning, sunshine!\":e===\"afternoon\"?\"Afternoon, friend!\":\"Hello, night owl!\"),e===\"morning\"||e===\"afternoon\"?(n.sunIcon?.classList.remove(\"hidden\"),n.moonIcon?.classList.add(\"hidden\")):(n.moonIcon?.classList.remove(\"hidden\"),n.sunIcon?.classList.add(\"hidden\")),setTimeout(s,a())}s();"]],"assets":["/_astro/art-thoughts.B3Z8Ho7J.png","/_astro/karina-profile.B_WIvNWn.webp","/_astro/cloud-left.C0ugVHyH.webp","/_astro/cloud-right.Dg9D5R-t.webp","/_astro/trees.CSbi_RfY.webp","/_astro/about.CoEhUh4s.css","/favicon.svg","/fonts/Safiro-Regular.woff2","/404.html","/about/index.html","/thoughts/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"vaklB+MVGYJlrcIn89By0QQ9Ri2rD1a2p/kh3wj3v2k="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
