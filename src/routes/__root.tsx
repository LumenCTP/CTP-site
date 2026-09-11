import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ClearToPay Construction — Know Which Vendors Are Safe to Pay" },
      { name: "description", content: "ClearToPay tells contractors exactly which vendors are safe to pay. AI reads COIs, W-9s & insurance docs, checks coverage limits, and sends weekly Clear-to-Pay reports plus audit-ready packages." },
      { property: "og:title", content: "ClearToPay Construction — Know Which Vendors Are Safe to Pay" },
      { property: "og:description", content: "ClearToPay tells contractors exactly which vendors are safe to pay. AI reads COIs, W-9s & insurance docs, checks coverage limits, and sends weekly Clear-to-Pay reports plus audit-ready packages." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.cleartopayconstruction.com/" },
      { property: "og:site_name", content: "ClearToPay Construction" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "canonical", href: "https://www.cleartopayconstruction.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "ClearToPay Construction",
              url: "https://www.cleartopayconstruction.com/",
            },
            {
              "@type": "WebSite",
              name: "ClearToPay Construction",
              url: "https://www.cleartopayconstruction.com/",
            },
          ],
        }),
      },
    ],
  }),
  notFoundComponent: () => <div>Page not found</div>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
