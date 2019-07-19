const logoImage = (size) => ({
  src: `images/logo.png?width=${size}`,
  sizes: `${size}x${size}`,
  type: 'image/png',
});

export const manifest = {
  short_name: 'My First PWA',
  name: 'My First Workbox Progressive Web App',
  icons: [57, 76, 120, 152, 167, 180, 512].map(logoImage),
  start_url: '/',
  background_color: '#3367D6',
  display: 'minimal-ui',
  scope: '/',
  theme_color: '#3367D6',
};
