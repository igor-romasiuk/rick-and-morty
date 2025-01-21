'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter((segment) => segment);

  const formatSegment = (segment: string) => {
    return segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm mb-4"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-green-400 hover:text-yellow-400 transition-transform duration-200 hover:scale-110"
          >
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = '/' + pathSegments.slice(0, index + 1).join('/');

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2 text-gray-500">›</span>

              {isLast ? (
                <span className="text-blue-300">{formatSegment(decodeURIComponent(segment))}</span>
              ) : (
                <Link
                  href={href}
                  className="text-green-400 hover:text-yellow-400 transition-transform duration-200 hover:scale-110"
                >
                  {formatSegment(decodeURIComponent(segment))}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;