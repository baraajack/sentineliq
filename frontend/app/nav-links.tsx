"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assets", label: "Assets" },
  { href: "/events", label: "Events" },
  { href: "/alerts", label: "Alerts" },
  { href: "/incidents", label: "Incidents" },
  { href: "/detection-rules", label: "Detection Rules" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label="Primary navigation">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`nav-link${isActive ? " nav-link-active" : ""}`}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
