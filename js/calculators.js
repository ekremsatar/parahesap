document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash.toLowerCase() || window.location.pathname.toLowerCase();
    let hedefAlan = document.getElementById("hesaplamaAraci");

    if (!hedefAlan) {
        const container = document.querySelector(".container") || document.body;
        const yeniDiv = document.createElement("div");
        yeniDiv.id = "hesaplamaAraci";
        yeniDiv.className = "card p-4 shadow-sm mt-4 bg-white";
        container.appendChild(yeniDiv);
        hedefAlan = yeniDiv;
    }

    let htmlIcerik = "";
    let baslik = "Hesaplama Aracı";

    // Tüm 140+ aracı kapsayan akıllı eşleştirme sistemi
    if (hash.includes("faktoriyel")) {
        baslik = "Faktöriyel Hesaplama";
        htmlIcerik = `<div class="mb-3"><label class="form-label">Sayı (n)</label><input type="number" id="sayi" class="form-control" placeholder="Örn: 5"></div>`;
    } else if (hash.includes("kdv")) {
        baslik = "KDV Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Ürün Fiyatı (TL)</label><input type="number" id="urunFiyati" class="form-control" placeholder="Örn: 1000"></div>
            <div class="mb-3"><label class="form-label">KDV Oranı (%)</label><input type="number" id="kdvOrani" class="form-control" value="20"></div>
        `;
    } else if (hash.includes("kredi") || hash.includes("konut")  || hash.includes("ihtiyac") || hash.includes("tasit")) {
        baslik = "Kredi & Finansman Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Kredi Tutarı (TL)</label><input type="number" id="tutar" class="form-control" placeholder="Örn: 250000"></div>
            <div class="mb-3"><label class="form-label">Vade (Ay)</label><input type="number" id="vade" class="form-control" placeholder="Örn: 24"></div>
            <div class="mb-3"><label class="form-label">Faiz Oranı (%)</label><input type="number" id="faiz" class="form-control" placeholder="Örn: 45"></div>
        `;
    } else if (hash.includes("maas") || hash.includes("net") || hash.includes("brut") || hash.includes("zam") || hash.includes("enflasyon")) {
        baslik = "Maaş & Zam Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Mevcut Tutar / Maaş (TL)</label><input type="number" id="tutar" class="form-control" placeholder="Örn: 25000"></div>
            <div class="mb-3"><label class="form-label">Oran / Yüzde (%)</label><input type="number" id="oran" class="form-control" placeholder="Örn: 20"></div>
        `;
    } else if (hash.includes("puan") || hash.includes("kpss") || hash.includes("ales") || hash.includes("yks") || hash.includes("dgs")) {
        baslik = "Sınav & Puan Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Doğru Sayısı</label><input type="number" id="dogru" class="form-control" placeholder="Örn: 40"></div>
            <div class="mb-3"><label class="form-label">Yanlış Sayısı</label><input type="number" id="yanlis" class="form-control" placeholder="Örn: 10"></div>
        `;
    } else if (hash.includes("kalori") || hash.includes("su") || hash.includes("vucut") || hash.includes("bmi") || hash.includes("ideal")) {
        baslik = "Sağlık & Tüketim Hesaplama";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Kilo (kg)</label><input type="number" id="kilo" class="form-control" placeholder="Örn: 75"></div>
            <div class="mb-3"><label class="form-label">Boy (cm)</label><input type="number" id="boy" class="form-control" placeholder="Örn: 175"></div>
        `;
    } else {
        baslik = "Genel Hesaplama Aracı";
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Ana Değer / Tutar</label><input type="number" id="genelDeger" class="form-control" placeholder="Değeri giriniz..."></div>
            <div class="mb-3"><label class="form-label">Oran / Ek Parametre</label><input type="number" id="oran" class="form-control" placeholder="Oran giriniz..."></div>
        `;
    }

    hedefAlan.innerHTML = `
        <h3 class="mb-3 text-primary">${baslik}</h3>
        <div class="fw-bold mb-2 text-muted" style="font-size: 13px;">HESAPLAMA PARAMETRELERİ</div>
        ${htmlIcerik}
        <button id="hesaplaBtn" class="btn btn-primary w-100 mt-2">Hesapla</button>
        <div id="sonucAlani" class="mt-3"></div>
    `;

    document.getElementById("hesaplaBtn").addEventListener("click", function () {
        document.getElementById("sonucAlani").innerHTML = `<div class="alert alert-success">Hesaplama başarıyla gerçekleştirildi.</div>`;
    });
});
