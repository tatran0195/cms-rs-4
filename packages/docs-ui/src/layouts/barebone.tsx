import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';
import type React from 'react';

export type BareboneLayoutProps = {
  htmlClassName?: string;
  children: React.ReactNode;
  gaId?: string;
};

export const BareboneLayout = ({ htmlClassName, children, gaId }: BareboneLayoutProps) => (
  <html lang="en" className={clsx('h-full w-full', htmlClassName)}>
    <head />
    {children}
    {gaId && <GoogleAnalytics gaId={gaId} />}
  </html>
);
