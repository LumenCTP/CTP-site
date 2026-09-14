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
      { name: "description", content: "ClearToPay tracks vendor COIs, W-9s & insurance, flags missing or expiring docs, and sends weekly Clear-to-Pay reports — know who's safe to pay, stay audit-ready." },
      { property: "og:title", content: "ClearToPay Construction — Know Which Vendors Are Safe to Pay" },
      { property: "og:description", content: "ClearToPay tracks vendor COIs, W-9s & insurance, flags missing or expiring docs, and sends weekly Clear-to-Pay reports — know who's safe to pay, stay audit-ready." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cleartopay.ctonew.app/" },
      { property: "og:site_name", content: "ClearToPay Construction" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "canonical", href: "https://cleartopay.ctonew.app/" },
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
              url: "https://cleartopay.ctonew.app/",
              description:
                "AI-assisted vendor compliance document tracking for construction companies.",
            },
            {
              "@type": "WebSite",
              name: "ClearToPay Construction",
              url: "https://cleartopay.ctonew.app/",
            },
            {
              "@type": "Service",
              name: "Vendor Compliance Tracking & Clear-to-Pay Reports",
              serviceType: "Construction vendor compliance management",
              description:
                "Tracks vendor COIs, W-9s and insurance documents, flags missing or expiring documents, and delivers weekly Clear-to-Pay reports and audit-ready packages for construction companies.",
              provider: {
                "@type": "Organization",
                name: "ClearToPay Construction",
              },
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
