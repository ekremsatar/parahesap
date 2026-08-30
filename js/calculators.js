document.addEventListener("DOMContentLoaded", function () {
    // URL'deki hash kısmını al (Örn: #faktoriyel, #kdv, #kredi)
    const hash = window.location.hash.toLowerCase();
    
    // Formun basılacağı ana alanı bul (Ana sayfada veya şablonda bu ID olmalı)
    let hedefAlan = document.getElementById("hesaplamaAraci") || document.querySelector("form");

    if (!hedefAlan) {
        // Eğer hedef alan bulunamazsa sayfaya dinamik bir alan ekle
        const container = document.querySelector(".container") || document.body;
        const yeniDiv = document.createElement("div");
        yeniDiv.id = "hesaplamaAraci";
        yeniDiv.className = "card p-4 shadow-sm mt-4";
        container.appendChild(yeniDiv);
        hedefAlan = yeniDiv;
    }

    let htmlIcerik = "";
    let baslik = "Hesaplama Aracı";

    // Hash değerine göre form parametreleri
    if (hash.includes("faktoriyel")) {
        baslik = "Faktöriyel Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Sayı (n)</label><input type="number" id="sayi" class="form-control" placeholder="Örn: 5"></div>
        `;
    } else if (hash.includes("kdv")) {
        baslik = "KDV Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Ürün Fiyatı (TL)</label><input type="number" id="urunFiyati" class="form-control" placeholder="Örn: 1000"></div>
            <div class="mb-3"><label class="form-label">KDV Oranı (%)</label><input type="number" id="kdvOrani" class="form-control" value="20"></div>
        `;
    } else if (hash.includes("kredi") || hash.includes("konut")) {
        baslik = "Kredi Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Kredi Tutarı (TL)</label><input type="number" id="tutar" class="form-control" placeholder="Örn: 250000"></div>
            <div class="mb-3"><label class="form-label">Vade (Ay)</label><input type="number" id="vade" class="form-control" placeholder="Örn: 24"></div>
            <div class="mb-3"><label class="form-label">Faiz Oranı (%)</label><input type="number" id="faiz" class="form-control" placeholder="Örn: 45"></div>
        `;
    } else if (hash.includes("kalori") || hash.includes("su")) {
        baslik = "Tüketim / Kalori Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Kilo (kg)</label><input type="number" id="kilo" class="form-control" placeholder="Örn: 75"></div>
            <div class="mb-3"><label class="form-label">Günlük Süre / Miktar</label><input type="number" id="miktar" class="form-control" placeholder="Örn: 2"></div>
        `;
    } else {
        baslik = "Genel Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Değer / Tutar</label><input type="number" id="genelDeger" class="form-control" placeholder="Değeri girin..."></div>
        `;
    }

    // Ekranı güncelle
    hedefAlan.innerHTML = `
        <h3 class="mb-3 text-primary">${baslik}</h3>
        <div class="fw-bold mb-2 text-muted">HESAPLAMA PARAMETRELERİ</div>
        ${htmlIcerik}
        <button id="hesaplaBtn" class="btn btn-primary w-100 mt-2">Hesapla</button>
        <div id="sonucAlani" class="mt-3"></div>
    `;

    // Hesapla butonuna işlev ver
    document.getElementById("hesaplaBtn").addEventListener("click", function () {
        document.getElementById("sonucAlani").innerHTML = `<div class="alert alert-success">Hesaplama başarıyla tamamlandı.</div>`;
    });
});
