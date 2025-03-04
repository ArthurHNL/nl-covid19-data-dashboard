import React from 'react';
import { Breadcrumbs } from '~/components/breadcrumbs';
import { BreadcrumbsDataProvider } from '~/components/breadcrumbs/logic/use-breadcrumbs';
import { AppFooter } from '~/components/layout/app-footer';
import { AppHeader } from '~/components/layout/app-header';
import { NotificationBanner } from '~/components/notification-banner';
import { SEOHead } from '~/components/seo-head';
import { SkipLinkMenu } from '~/components/skip-link-menu';
import { useIntl } from '~/intl';
import { CurrentDateProvider } from '~/utils/current-date-context';
interface LayoutProps {
  title: string;
  url?: string;
  description?: string;
  openGraphImage?: string;
  twitterImage?: string;
  breadcrumbsData?: Record<string, string>;
}

export function Layout(
  props: LayoutProps & { lastGenerated: string; children: React.ReactNode }
) {
  const {
    breadcrumbsData,
    children,
    title,
    description,
    openGraphImage,
    twitterImage,
    url,
    lastGenerated,
  } = props;

  const { siteText } = useIntl();

  return (
    <div>
      <SEOHead
        title={title}
        description={description}
        openGraphImage={openGraphImage}
        twitterImage={twitterImage}
        url={url}
      />
      <SkipLinkMenu
        ariaLabel={siteText.aria_labels.skip_links}
        links={[
          { href: '#content', label: siteText.skiplinks.inhoud },
          { href: '#main-navigation', label: siteText.skiplinks.nav },
          { href: '#metric-navigation', label: siteText.skiplinks.metric_nav },
          { href: '#footer-navigation', label: siteText.skiplinks.footer_nav },
        ]}
      />
      <AppHeader />

      {siteText.dashboard_wide_notification.title.length !== 0 && (
        <NotificationBanner
          title={siteText.dashboard_wide_notification.title}
          description={siteText.dashboard_wide_notification.description}
        />
      )}

      <BreadcrumbsDataProvider value={breadcrumbsData}>
        <Breadcrumbs />
      </BreadcrumbsDataProvider>

      <CurrentDateProvider dateInSeconds={Number(lastGenerated)}>
        <div>{children}</div>
      </CurrentDateProvider>
      <AppFooter />
    </div>
  );
}
