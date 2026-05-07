const store = {
    // Store Info
    storeName: "Browse Our Katalog Products",
    // Header Info
    title: "Katalog",
    subtitle: "Simple Untuk Listing Produk",
    // Banner Info
    bannerTitle: "Temukan Produk Terbaik",
    bannerSubtitle: "Koleksi sederhana, cepat, dan ringan",
    // Footer Info
    name: "Catalog Store",
    phone: "6282154311693",
    location: "Balikpapan, Indonesia",
    instagram: "https://www.instagram.com/rvn9lo?igsh=OTkxcGprOXo0dml3",
    facebook: "https://www.facebook.com/share/1789KBi7Kt/",
    tiktok: "#"
};

document.title = store.storeName;

const products = [
  {
    name: "Sony Walkman WM-FX195",
    desc: "Kaset retro portable dengan radio FM/AM dan desain klasik era 90an.",
    price: 185000,
    image: "productsImage/img1.jpg"
  },
  {
    name: "Panasonic RX-SA15",
    desc: "Tape radio compact vintage dengan speaker bawaan dan suara hangat analog.",
    price: 240000,
    image: "productsImage/img2.jpg"
  },
  {
    name: "Aiwa Cassette Player HS-TX",
    desc: "Pemutar kaset retro ringan dengan tampilan silver hitam khas lawas.",
    price: 210000,
    image: "productsImage/img3.jpg"
  },
  {
    name: "National Panasonic Retro Tape",
    desc: "Radio tape persegi panjang klasik dengan nuansa jadul autentik.",
    price: 325000,
    image: "productsImage/img4.jpg"
  },
  {
    name: "Sharp Twin Speaker Cassette",
    desc: "Tape retro dual speaker dengan desain tebal dan suara bass khas.",
    price: 410000,
    image: "productsImage/img5.jpg"
  },
  {
    name: "Sanyo Portable Cassette Radio",
    desc: "Kaset radio vintage portable cocok untuk koleksi dan dekorasi.",
    price: 275000,
    image: "productsImage/img6.jpg"
  },
  {
    name: "Toshiba Vintage Tape Recorder",
    desc: "Tape recorder klasik dengan tombol mekanik dan bodi metal retro.",
    price: 360000,
    image: "productsImage/img7.jpg"
  },
  {
    name: "JVC Retro Cassette Player",
    desc: "Pemutar kaset retro bergaya minimalis dengan nuansa hitam monokrom.",
    price: 295000,
    image: "productsImage/img8.jpg"
  }
];

const list = document.getElementById("product-list");
const loading = document.getElementById("loading");
const search = document.getElementById("search");
const sort = document.getElementById("sort");

const sortToggle = document.getElementById("sort-toggle");
const sortMenu = document.getElementById("sort-menu");

let filteredProducts = [...products];

let index = 0;
const batchSize = 4;

function createCard(p) {
    const col = document.createElement("div");

    col.className = "col-6 col-sm-6 col-md-6 col-lg-3";

    col.innerHTML = `
    <div class="card h-100">
      <img src="${p.image}" class="card-img-top" alt="${p.name}" />

      <div class="card-body d-flex flex-column">
        <h5>${p.name}</h5>

        <p>${p.desc}</p>

        <div class="price mb-2">
          Rp${p.price.toLocaleString("id-ID")}
        </div>

        <a
          href="https://wa.me/${store.phone}?text=${encodeURIComponent(
              `Halo, saya mau pesan ${p.name} - harga Rp${p.price.toLocaleString("id-ID")}`
          )}"
          target="_blank"
          class="btn btn-dark btn-sm w-100"
        >
          Chat WhatsApp
        </a>
      </div>
    </div>
  `;

    list.appendChild(col);
}

function renderItems() {
    const slice = filteredProducts.slice(index, index + batchSize);

    slice.forEach(createCard);

    index += batchSize;

    if (index >= filteredProducts.length) {
        loading.innerText = "No more products";
        window.removeEventListener("scroll", handleScroll);
    } else {
        loading.innerText = "Loading...";
    }
}

function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 50) {
        renderItems();
    }
}

function updateProducts() {
    const keyword = search.value.toLowerCase();

    filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    if (sort.value === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sort.value === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    list.innerHTML = "";
    index = 0;

    window.removeEventListener("scroll", handleScroll);

    renderItems();

    if (filteredProducts.length > batchSize) {
        window.addEventListener("scroll", handleScroll);
    }
}

search.addEventListener("input", updateProducts);

sortToggle.addEventListener("click", () => {
    sortMenu.style.display =
        sortMenu.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".sort-menu div").forEach(item => {
    item.addEventListener("click", () => {
        sort.value = item.dataset.sort;

        updateProducts();

        sortMenu.style.display = "none";
    });
});

window.addEventListener("click", e => {
    if (!e.target.closest(".sort-dropdown")) {
        sortMenu.style.display = "none";
    }
});

renderItems();
window.addEventListener("scroll", handleScroll);

document.getElementById("footer-whatsapp").href =
    `https://wa.me/${store.phone}`;

document.getElementById("footer-instagram").href = store.instagram;

document.getElementById("footer-facebook").href = store.facebook;

document.getElementById("footer-tiktok").href = store.tiktok;

document.getElementById("footer-location").innerText = store.location;

document.getElementById("footer-store-name").innerText = store.name;

document.getElementById("header-title").innerText = store.title;

document.getElementById("header-subtitle").innerText = store.subtitle;

document.getElementById("banner-title").innerText = store.bannerTitle;

document.getElementById("banner-subtitle").innerText = store.bannerSubtitle;
