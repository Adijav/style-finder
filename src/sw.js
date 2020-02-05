console.log(" inside src sw Hello World");
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

self.addEventListener('install', event => {
    console.log('install')
});
self.addEventListener('activate', event => {
    console.log('activate')
});

workbox.routing.registerRoute(
    new RegExp('https:.*min\.(css|js)'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'cache'
    })
);

workbox.routing.registerRoute(
    /http:\/\/localhost:4200\/alphabetsWordsList/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'cache'
    })
);