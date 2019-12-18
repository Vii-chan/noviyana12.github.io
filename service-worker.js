importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox) {
   console.log(`Yey Workbox berhasil dimuat`);
   workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/css/homeimage/landingpage.webp', revision: '1' },
    { url: '/css/homeimage/section-3.webp', revision: '1' },
    { url: '/css/teamimage/background.webp', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/app.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/jquery.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/push.js', revision: '1' },
    { url: '/img/icon72.png', revision: '1' },
    { url: '/img/icon96.png', revision: '1' },
    { url: '/img/icon128.png', revision: '1' },
    { url: '/img/icon144.png', revision: '1' },
    { url: '/img/icon152.png', revision: '1' },
    { url: '/img/icon192.png', revision: '1' },
    { url: '/img/icon384.png', revision: '1' },
    { url: '/img/icon512.png', revision: '1' },
    { url: '/img/icon512.webp', revision: '1' },  
    { url: '/manifest.json', revision: '1' }
    ]);

   workbox.routing.registerRoute(
     new RegExp('/pages/'),
     workbox.strategies.staleWhileRevalidate({
        cacheName: "pages-chaching",
        cacheExpiration: {
            maxAgeSeconds: 24*60*60
        }
     })
);
    workbox.routing.registerRoute(
      new RegExp("https://api.football-data.org/v2/"),
      workbox.strategies.staleWhileRevalidate({
         cacheName: "fetch-api-caching",
         cacheExpiration: {
            maxAgeSeconds: 24 * 60 * 60
      }
    })
  );

    workbox.routing.registerRoute(
      new RegExp("https://fonts.googleapis.com/icon?family=Material+Icons"),
      workbox.strategies.staleWhileRevalidate({
         cacheName: "material-caching",
         cacheExpiration: {
            maxAgeSeconds: 24 * 60 * 60
      }
    })
  );
}else{
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon512.webp',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Soccer Sport', options)
    );
});


