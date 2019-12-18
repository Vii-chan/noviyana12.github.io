var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BL85sUgSUztkPtMu7FdPXJShvv8ms6PYSM1idzqifiEa9aAS0Tsex8K4awy-aaP1AqceA4nLfG_BOqrX9DudHaA",
   "privateKey": "XZc8gKYgZ8UkH6uD3pdiC1J9-OWILWisSOShrstE8IE"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/epCCpv1f7bg:APA91bE2uV4WgL5SFuXn2OArmc2rkDZiKpLZ7n9GaG8UOM7kNO6wnrIpmhUxuSOtmMIHJl5ZnqWLGw3YUlSRRwOvGb3KMns3EWJzAhedw06uZ7SdJnSh3Qn2MHhp5p7nNTk5Dy_SNN_E",
   "keys": {
       "p256dh": "BLSoAKoasSb048/V9yKOMEkTaq7X0sYCDTSyuAdEBxH8BJzFfZvMrv/v4+evPcFaTecJtSsLU65EPkLIIBIT7fk=",
       "auth": "7jaH0aHyWkpfU84e1FkXfA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '382254658092',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);