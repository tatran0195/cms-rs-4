import clsx from 'clsx';
import type React from 'react';
import { RootProviders, Sidebar, type SidebarProps } from '@/components';
import { AiAssistantChatWindow } from '../components/AiAssistant/ChatWindow';
import { TechArticleJsonLd } from '../components/TechArticleJsonLd';
import { MainContentLayout, type MainContentLayoutProps } from './main-content';

export type RootLayoutProps = {
  bodyClassName?: string;
  sidebarProps?: SidebarProps;
  showBreadcrumbs?: boolean;
  ProvidersComponent: React.FC<{ children: React.ReactNode }>;
  footerComponent?: React.ReactNode;
} & MainContentLayoutProps;

export const RootLayout = ({ bodyClassName, sidebarProps, ProvidersComponent, ...mainProps }: RootLayoutProps) => (
  <body className={clsx('h-screen w-full overflow-hidden')}>
    <div
      className={clsx(
        'bg-cms-bg-subtle font-base text-medium w-full',
        'text-cms-fg-base',
        'h-full overflow-hidden',
        'grid grid-cols-1 lg:mx-auto lg:grid-cols-[221px_1fr]',
        bodyClassName,
      )}
      id="root-layout"
    >
      <RootProviders>
        <ProvidersComponent>
          <Sidebar {...sidebarProps} />
          <div className={clsx('relative', 'h-screen', 'flex')}>
            <MainContentLayout {...mainProps} />
            <AiAssistantChatWindow />
          </div>
          <TechArticleJsonLd />
        </ProvidersComponent>
      </RootProviders>
    </div>
  </body>
);
