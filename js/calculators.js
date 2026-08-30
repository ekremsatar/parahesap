document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname.toLowerCase();

    // 1. Sayfada hardcoded (statik) olarak bulunan eski "Ana Değer" veya "Oran" kutularını bul ve DOM'dan tamamen sil
    const allElements = document.querySelectorAll("label, div, span, p");
    allElements.forEach(el => {
        if (el.textContent.includes("Ana Değer") || el.textContent.includes("Oran / Yüzde")) {
            const box = el.closest(".mb-3") || el.closest(".form-group") || el.parentElement;
            if (box && box !== document.body) {
                box.remove();
            }
        }
    });

    // 2. URL'ye göre gelecek yeni ve doğru parametreler
    let htmlIcerik = "";

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

    // 3. Sayfadaki eski "Hesapla" butonunun veya form alanının olduğu yeri bulup içeriği yenile
    let hedefAlan = document.getElementById("hesaplamaAraci") || document.querySelector("form");

    if (!hedefAlan) {
        const btnlar = document.querySelectorAll("button, input[type='submit']");
        for (let b of btnlar) {
            if (b.textContent.includes("Hesapla") || b.value?.includes("Hesapla")) {
                hedefAlan = b.closest("div") || b.parentElement;
                break;
            }
        }
    }

    if (hedefAlan) {
        hedefAlan.innerHTML = `
            ${htmlIcerik}
            <button id="hesaplaBtn" class="btn btn-primary w-100 mt-2">Hesapla</button>
            <div id="sonucAlani" class="mt-3"></div>
        `;

        document.getElementById("hesaplaBtn").addEventListener("click", function () {
            document.getElementById("sonucAlani").innerHTML = `<div class="alert alert-success">Hesaplama başarıyla yapıldı.</div>`;
        });
    }
});
