"use client";

import Link from "next/link";
import { SlashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";

// Function to format the breadcrumb label from the path segment
const formatBreadcrumb = (segment: string): string => {
  // Decode URI component to handle special characters
  const decoded = decodeURIComponent(segment);
  // Replace hyphens with spaces and capitalize each word
  return decoded
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Breadcrumps() {
  const pathname = usePathname();

  // Split the pathname and remove empty segments
  const segments = pathname.split("/").filter(Boolean);

  // Create breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    // Generate the path up to the current segment
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    const label = formatBreadcrumb(segment);

    return {
      label,
      href,
      isLast,
    };
  });

  // Don't show breadcrumbs if we're on the home page
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div className="h-10 border-b bg-background flex items-center justify-center px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:underline text-sm">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((breadcrumb) => (
            <div key={breadcrumb.href} className="flex items-center">
              <BreadcrumbSeparator>
                <SlashIcon className="w-3 h-3" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {breadcrumb.isLast ? (
                  <BreadcrumbPage className="text-sm font-medium">
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={breadcrumb.href}
                      className="hover:underline text-sm"
                    >
                      {" "}
                      {breadcrumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
