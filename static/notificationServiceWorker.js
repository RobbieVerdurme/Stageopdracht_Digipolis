self.addEventListener('notificationclick', (e) => {
  if (e.action === 'close') {
    e.notification.close()
  } else {
    e.notification.close()
    // eslint-disable-next-line no-undef
    clients.openWindow(e.notification.data.url)
  }
}, false)
