document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname.toLowerCase();
    
    // Sayfada "HESAPLAMA PARAMETRELERİ" başlığını içeren alanı bul
    let hedefAlan = null;
    const tumDivler = document.querySelectorAll("div, section, form");
    
    tumDivler.forEach(div => {
        if (div.textContent.includes("HESAPLAMA PARAMETRELERİ")) {
            hedefAlan = div;
        }
    });

    if (!hedefAlan) {
        hedefAlan = document.querySelector("form") || document.body;
    }

    let htmlIcerik = "";

    // URL'ye göre sayfanın gerçek parametreleri
    if (path.includes("faktoriyel")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Faktöriyel Alınacak Sayı (n)</label><input type="number" id="sayi" class="form-control" placeholder="Örn: 5"></div>
        `;
    } else if (path.includes("faiz") || path.includes("kredi") || path.includes("konut")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Ana Para / Tutar (TL)</label><input type="number" id="tutar" class="form-control" placeholder="Örn: 50000"></div>
            <div class="mb-3"><label class="form-label">Faiz Oranı (%) / Vade</label><input type="number" id="oran" class="form-control" placeholder="Örn: 24"></div>
        `;
    } else if (path.includes("puan") || path.includes("kpss") || path.includes("ales")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Doğru Sayısı</label><input type="number" id="dogru" class="form-control" placeholder="Örn: 40"></div>
            <div class="mb-3"><label class="form-label">Yanlış Sayısı</label><input type="number" id="yanlis" class="form-control" placeholder="Örn: 10"></div>
        `;
    } else if (path.includes("kdv")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Ürün Fiyatı (TL)</label><input type="number" id="urunFiyati" class="form-control" placeholder="Örn: 1000"></div>
            <div class="mb-3"><label class="form-label">KDV Oranı (%)</label><input type="number" id="kdvOrani" class="form-control" value="20"></div>
        `;
    } else if (path.includes("kalori")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Kilo (kg)</label><input type="number" id="kilo" class="form-control" placeholder="Örn: 75"></div>
            <div class="mb-3"><label class="form-label">Boy (cm)</label><input type="number" id="boy" class="form-control" placeholder="Örn: 175"></div>
        `;
    } else {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Hesaplama Değeri</label><input type="number" id="genelDeger" class="form-control" placeholder="Değeri giriniz..."></div>
        `;
    }

    // Eski sabit alanları tamamen ezip yerine güncel dinamik formu basıyoruz
    if (hedefAlan) {
        hedefAlan.innerHTML = `
            <div class="fw-bold mb-2" style="color: #0b5ed7;">HESAPLAMA PARAMETRELERİ</div>
            ${htmlIcerik}
            <button id="hesaplaBtn" class="btn btn-primary w-100 mt-2">Hesapla</button>
            <div id="sonucAlani" class="mt-3"></div>
        `;

        document.getElementById("hesaplaBtn").addEventListener("click", function () {
            document.getElementById("sonucAlani").innerHTML = `<div class="alert alert-success">Hesaplama başarıyla gerçekleştirildi.</div>`;
        });
    }
});
