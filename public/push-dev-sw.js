/* Service worker mínimo para Web Push em desenvolvimento (ngsw desligado). */
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (_) {
    data = { notification: { title: 'Gestgo', body: event.data?.text?.() || '' } };
  }
  const n = data.notification || data;
  const title = n.title || 'Gestgo';
  const options = {
    body: n.body || '',
    icon: n.icon || '/icons/icon-192x192.png',
    badge: n.badge || '/icons/icon-72x72.png',
    data: n.data || {},
    tag: n.tag || 'gestgo',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.onActionClick?.default?.url || '/m';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ('focus' in client) {
          client.navigate?.(url);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    }),
  );
});
