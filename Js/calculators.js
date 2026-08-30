document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname.toLowerCase();

    // Sayfada hesaplama formunun veya parametrelerin bulunduğu ana alanı bul
    let formAlani = document.querySelector("form") || document.getElementById("hesaplamaAraci");

    if (!formAlani) {
        // Eğer özel bir id yoksa, "HESAPLAMA PARAMETRELERİ" başlığının altındaki alanı bulmaya çalış
        const basliklar = document.querySelectorAll("h1, h2, h3, h4, h5, .card, .container div");
        for (let el of basliklar) {
            if (el.textContent.includes("HESAPLAMA PARAMETRELERİ")) {
                formAlani = el.nextElementSibling || el.parentElement;
                break;
            }
        }
    }

    // Hiçbiri bulunamazsa içeriği değiştirmek için uygun bir yer bul
    if (!formAlani) {
        formAlani = document.querySelector(".col-md-8, .content, main") || document.body;
    }

    let htmlIcerik = "";

    // URL'ye göre sayfanın özel inputları
    if (path.includes("kredi") || path.includes("konut")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Kredi Tutarı (TL)</label><input type="number" id="tutar" class="form-control" placeholder="Örn: 250000"></div>
            <div class="mb-3"><label class="form-label">Vade (Ay)</label><input type="number" id="vade" class="form-control" placeholder="Örn: 24"></div>
            <div class="mb-3"><label class="form-label">Faiz Oranı (%)</label><input type="number" id="faiz" class="form-control" placeholder="Örn: 45"></div>
        `;
    } else if (path.includes("kdv")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Ürün Fiyatı (TL)</label><input type="number" id="urunFiyati" class="form-control" placeholder="Örn: 1000"></div>
            <div class="mb-3"><label class="form-label">KDV Oranı (%)</label><input type="number" id="kdvOrani" class="form-control" value="20"></div>
        `;
    } else if (path.includes("kpss") || path.includes("puan")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Doğru Sayısı</label><input type="number" id="dogru" class="form-control" placeholder="Örn: 80"></div>
            <div class="mb-3"><label class="form-label">Yanlış Sayısı</label><input type="number" id="yanlis" class="form-control" placeholder="Örn: 20"></div>
        `;
    } else if (path.includes("kalori")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Kilo (kg)</label><input type="number" id="kilo" class="form-control" placeholder="Örn: 75"></div>
            <div class="mb-3"><label class="form-label">Boy (cm)</label><input type="number" id="boy" class="form-control" placeholder="Örn: 175"></div>
            <div class="mb-3"><label class="form-label">Yaş</label><input type="number" id="yas" class="form-control" placeholder="Örn: 30"></div>
        `;
    } else if (path.includes("karekok")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Karekökü Alınacak Sayı</label><input type="number" id="sayi" class="form-control" placeholder="Örn: 144"></div>
        `;
    } else if (path.includes("zam")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Mevcut Tutar / Maaş (TL)</label><input type="number" id="mevcutTutar" class="form-control" placeholder="Örn: 25000"></div>
            <div class="mb-3"><label class="form-label">Beklenen Zam Oranı (%)</label><input type="number" id="zamOrani" class="form-control" placeholder="Örn: 25"></div>
        `;
    } else {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Hesaplama Değeri / Tutarı</label><input type="number" id="genelDeger" class="form-control" placeholder="Değeri giriniz..."></div>
        `;
    }

    // Parametre alanını tamamen yenile ve sadece doğru olanları koy
    formAlani.innerHTML = `
        <div id="dinamikFormAlani">
            ${htmlIcerik}
            <button id="hesaplaBtn" class="btn btn-primary w-100 mt-2">Hesapla</button>
            <div id="sonucAlani" class="mt-3"></div>
        </div>
    `;

    document.getElementById("hesaplaBtn").addEventListener("click", function () {
        document.getElementById("sonucAlani").innerHTML = `<div class="alert alert-success">Hesaplama başarıyla yapıldı.</div>`;
    });
});
