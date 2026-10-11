import { TriangleRightMini } from '@cms/icons';
import clsx from 'clsx';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import type React from 'react';

export type LinkProps = Partial<NextLinkProps> &
  React.AllHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    children?: React.ReactNode;
    className?: string;
    withIcon?: boolean;
    variant?: 'default' | 'content';
  };

const HASH_REGEX = /#.*$/;

export const Link = ({ href, children, className, withIcon = false, variant = 'default', ...rest }: LinkProps) => {
  const hash = href?.match(HASH_REGEX)?.[0] || '';
  const hrefWithoutHash = href?.replace(HASH_REGEX, '') || '';
  if (hrefWithoutHash.endsWith('page.mdx')) {
    href = hrefWithoutHash.replace('/page.mdx', '') + hash;
  }
  return (
    <NextLink
      href={href || ''}
      {...rest}
      className={clsx(
        variant === 'default' && 'text-cms-fg-interactive hover:text-cms-fg-interactive-hover',
        variant === 'content' && [
          'underline decoration-cms-fg-muted hover:decoration-cms-fg-interactive',
          'decoration-[1.5px] font-medium transition-[text-decoration-color]',
        ],
        withIcon && 'flex gap-0.25 items-center group',
        className,
      )}
    >
      {children}
      {withIcon && <TriangleRightMini className="group-hover:translate-x-docs_0.125 transition-transform" />}
    </NextLink>
  );
};
