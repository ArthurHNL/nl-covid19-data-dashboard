/**
 * Separate configuration file for the `domains` part in the next.config.js
 */
module.exports = [
  //Production environments
  {
    domain: 'coronadashboard.nl',
    defaultLocale: 'nl',
  },
  {
    domain: 'coronadashboard.rijksoverheid.nl',
    defaultLocale: 'nl',
  },
  {
    domain: 'coronadashboard.government.nl',
    defaultLocale: 'en',
  },
  // For convenience, the deploy previews are configured as well
  {
    domain: 'develop-en-covid19-data-dashboard.vercel.app',
    defaultLocale: 'en',
  },
  {
    domain: 'localhost',
    defaultLocale: 'nl',
  },
  {
    domain: 'localhost-en',
    defaultLocale: 'en',
  },
  {
    domain: 'master-en-covid19-data-dashboard.vercel.app',
    defaultLocale: 'en',
  },
  {
    domain: 'develop-nl-covid19-data-dashboard.vercel.app',
    defaultLocale: 'nl',
  },
  {
    domain: 'master-nl-covid19-data-dashboard.vercel.app',
    defaultLocale: 'nl',
  },
];
