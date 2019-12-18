if (!('serviceWorker' in navigator)) {
         console.log("Yah Browsermu Tidak Mendukung Service Worker");
     } else {
          registerServiceWorker();
          requestPermission();
    }

    function registerServiceWorker() {
      return navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
          console.log('Yey Service workermu berhasil didaftarkan!');
          return registration;
        })
        .catch(function (err) {
          console.error('Yah, registrasi service worker gagal ', err);
        });
    }

   function requestPermission() {
      if ('Notification' in window) {
         Notification.requestPermission().then(function (result) {
      if (result === "denied") {
         console.log("Fitur notifikasi tidak diijinkan.");
      return;
      } else if (result === "default") {
         console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
      }
       if (('PushManager' in window)) {
           navigator.serviceWorker.getRegistration().then(function(registration) {
                     registration.pushManager.subscribe({
                     userVisibleOnly: true,
                     applicationServerKey: urlBase64ToUint8Array("BL85sUgSUztkPtMu7FdPXJShvv8ms6PYSM1idzqifiEa9aAS0Tsex8K4awy-aaP1AqceA4nLfG_BOqrX9DudHaA")
                     })
                     .then(function(subscribe) {
                      console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                      console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                   null, new Uint8Array(subscribe.getKey('p256dh')))));
                      console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                   null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                      console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
             }
         }); 
    } else{
           console.log('Browser tidak mendukung notifikasi');
          }
    }

   function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
                      .replace(/-/g, '+')
                      .replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }