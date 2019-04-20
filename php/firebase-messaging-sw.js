// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

var config = {
    apiKey: "AIzaSyDItHexxmG-1NjPPq_v8eWqK-i8bZWZybI",
    authDomain: "vectisfood-2b3f6.firebaseapp.com",
    databaseURL: "https://vectisfood-2b3f6.firebaseio.com",
    projectId: "vectisfood-2b3f6",
    storageBucket: "vectisfood-2b3f6.appspot.com",
    messagingSenderId: "619499966458"
};
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };
    //document.location.reload(true);

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});