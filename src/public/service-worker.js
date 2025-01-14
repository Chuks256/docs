// force clearing previous service worker
self.addEventListener('install', function (e) {
  self.skipWaiting()
})

// activate service worker 
self.addEventListener('activate', function (e) {
  self.registration
    .unregister()
    .then(function () {
      return self.clients.matchAll()
    })
    .then(function (clients) {
      clients.forEach((client) => client.navigate(client.url))
    })
})
