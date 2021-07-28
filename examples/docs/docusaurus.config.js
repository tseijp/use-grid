/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'use-grid',
  tagline: '🤏 use-grid is a hook to build responsive layouts of all shapes and sizes.',
  url: 'https://tseijp.github.io',
  baseUrl: '/use-grid/',
  onBrokenLinks: 'throw',
  organizationName: 'tseijp',
  projectName: 'use-grid',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
    },
    navbar: {
      title: '🤏use-grid',
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Documentation' },
        { to: '/examples/intro', label: 'Examples', position: 'left' },
        {
          href: 'https://github.com/tseijp/use-grid',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Documents', to: '/documents/intro'},
            { label: 'Examples', to: '/examples/intro'},
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/use-grid' },
            { label: 'Twitter', href: 'https://twitter.com/tseijp' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/tseijp/use-grid' },
          ],
        },
      ],
      copyright: `©tseijp ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'documents',
          routeBasePath: 'documents',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/tseijp/use-grid/edit/master/examples/documents/',
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'examples',
        path: 'examples',
        routeBasePath: 'examples',
      },
    ],
  ],
};
