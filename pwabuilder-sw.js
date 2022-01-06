const staticEReading = "e-reading-site-v1"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/app.js",
    "/assets/fonts/Inter.ttf",
    "/assets/icons/baby-book.png",
    "/assets/icons/filter.svg",
    "/assets/icons/menu.svg",
    "/assets/icons/scientific.png",
    "/assets/icons/study.png",
    "/assets/icons/world-book.png",
    "/assets/img/book1.png",
    "/assets/img/no-img.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticEReading).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})