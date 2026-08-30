document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname.toLowerCase();
    const formAlani = document.getElementById("hesaplamaAraci");

    if (!formAlani) return;

    let htmlIcerik = "";

    // 1. KREDİ / KONUT / İHTİYAÇ KREDİSİ
    if (path.includes("kredi") || path.includes("konut")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Kredi Tutarı (TL)</label><input type="number" id="tutar" class="form-control" placeholder="Örn: 250000"></div>
            <div class="mb-3"><label class="form-label">Vade (Ay)</label><input type="number" id="vade" class="form-control" placeholder="Örn: 24"></div>
            <div class="mb-3"><label class="form-label">Faiz Oranı (Yıllık %)</label><input type="number" id="faiz" class="form-control" placeholder="Örn: 45"></div>
        `;
    } 
    // 2. KİRA ARTIŞ ORANI
    else if (path.includes("kira")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Mevcut Kira Bedeli (TL)</label><input type="number" id="mevcutKira" class="form-control" placeholder="Örn: 10000"></div>
            <div class="mb-3"><label class="form-label">TÜFE / Artış Oranı (%)</label><input type="number" id="tufeOrani" class="form-control" placeholder="Örn: 55"></div>
        `;
    } 
    // 3. KDV HESAPLAMA
    else if (path.includes("kdv")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Ürün Fiyatı (TL)</label><input type="number" id="urunFiyati" class="form-control" placeholder="Örn: 1000"></div>
            <div class="mb-3"><label class="form-label">KDV Oranı (%)</label><input type="number" id="kdvOrani" class="form-control" value="20"></div>
        `;
    } 
    // 4. KAREKÖK HESAPLAMA
    else if (path.includes("karekok")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Karekökü Alınacak Sayı</label><input type="number" id="sayi" class="form-control" placeholder="Örn: 144"></div>
        `;
    } 
    // 5. YAŞ HESAPLAMA
    else if (path.includes("yas")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Doğum Tarihi</label><input type="date" id="dogumTarihi" class="form-control"></div>
        `;
    } 
    // 6. ZAM HESAPLAMA
    else if (path.includes("zam")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Mevcut Tutar / Maaş (TL)</label><input type="number" id="mevcutTutar" class="form-control" placeholder="Örn: 25000"></div>
            <div class="mb-3"><label class="form-label">Beklenen Zam Oranı (%)</label><input type="number" id="zamOrani" class="form-control" placeholder="Örn: 25"></div>
        `;
    }
    // 7. MAAŞ (BRÜTTEN NETE / NETTEN BRÜTE)
    else if (path.includes("maas")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Brüt / Net Maaş (TL)</label><input type="number" id="maasTutar" class="form-control" placeholder="Örn: 30000"></div>
            <div class="mb-3"><label class="form-label">Çalışma / Vergi Dönemi Ayı</label><input type="number" id="donemAy" class="form-control" value="12"></div>
        `;
    }
    // 8. LOGARİTMA HESAPLAMA
    else if (path.includes("logaritma")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Sayı (x)</label><input type="number" id="logSayi" class="form-control" placeholder="Örn: 100"></div>
            <div class="mb-3"><label class="form-label">Taban (Varsayılan 10)</label><input type="number" id="logTaban" class="form-control" value="10"></div>
        `;
    }
    // 9. NAKLİYE MALİYET
    else if (path.includes("nakliye")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Mesafe (Kilometre)</label><input type="number" id="mesafe" class="form-control" placeholder="Örn: 350"></div>
            <div class="mb-3"><label class="form-label">Km Başına Maliyet (TL)</label><input type="number" id="kmMaliyet" class="form-control" placeholder="Örn: 15"></div>
        `;
    }
    // 10. HAFTANIN GÜNÜ BULMA
    else if (path.includes("haftanin-gunu")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Tarih Seçin</label><input type="date" id="haftaTarih" class="form-control"></div>
        `;
    }
    // 11. ENFLASYON HESAPLAMA
    else if (path.includes("enflasyon")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Başlangıç Tutarı (TL)</label><input type="number" id="baslangicTutar" class="form-control" placeholder="Örn: 1000"></div>
            <div class="mb-3"><label class="form-label">Enflasyon Oranı (%)</label><input type="number" id="enflasyonOrani" class="form-control" placeholder="Örn: 30"></div>
        `;
    } 
    // DİĞER TÜM SAYFALAR İÇİN AKILLI VARSAYILAN (Asgari Geçim, Zekat vb.)
    else {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Hesaplama Tutarı / Değeri (TL)</label><input type="number" id="genelTutar" class="form-control" placeholder="Örn: 10000"></div>
            <div class="mb-3"><label class="form-label">Oran / Ek Parametre (%)</label><input type="number" id="genelOran" class="form-control" placeholder="Örn: 10"></div>
        `;
    }

    // Formu ve Butonu Sayfaya Bas
    formAlani.innerHTML = `
        ${htmlIcerik}
        <button id="hesaplaBtn" class="btn btn-primary w-100 mt-2">Hesapla</button>
        <div id="sonucAlani" class="mt-3"></div>
    `;

    // HESAPLAMA MOTORU
    document.getElementById("hesaplaBtn").addEventListener("click", function () {
        const sonucAlani = document.getElementById("sonucAlani");

        if (path.includes("kredi") || path.includes("konut")) {
            const tutar = parseFloat(document.getElementById("tutar").value) || 0;
            const vade = parseInt(document.getElementById("vade").value) || 0;
            const faiz = parseFloat(document.getElementById("faiz").value) || 0;
            if (tutar <= 0 || vade <= 0) { alert("Lütfen alanları doldurun."); return; }
            const aylikFaiz = (faiz / 100) / 12;
            const taksit = (tutar * aylikFaiz * Math.pow(1 + aylikFaiz, vade)) / (Math.pow(1 + aylikFaiz, vade) - 1);
            sonucAlani.innerHTML = `<div class="alert alert-success">Aylık Taksit: <b>${taksit.toFixed(2)} TL</b><br>Toplam Ödeme: <b>${(taksit * vade).toFixed(2)} TL</b></div>`;
        } 
        else if (path.includes("kdv")) {
            const fiyat = parseFloat(document.getElementById("urunFiyati").value) || 0;
            const oran = parseFloat(document.getElementById("kdvOrani").value) || 0;
            const kdvTutar = fiyat * (oran / 100);
            sonucAlani.innerHTML = `<div class="alert alert-success">KDV Tutarı: <b>${kdvTutar.toFixed(2)} TL</b><br>Toplam Fiyat: <b>${(fiyat + kdvTutar).toFixed(2)} TL</b></div>`;
        }
        else if (path.includes("karekok")) {
            const sayi = parseFloat(document.getElementById("sayi").value) || 0;
            sonucAlani.innerHTML = `<div class="alert alert-success">Karekök Sonucu: <b>${Math.sqrt(sayi).toFixed(4)}</b></div>`;
        }
        else if (path.includes("zam")) {
            const mevcut = parseFloat(document.getElementById("mevcutTutar").value) || 0;
            const oran = parseFloat(document.getElementById("zamOrani").value) || 0;
            const fark = mevcut * (oran / 100);
            sonucAlani.innerHTML = `<div class="alert alert-success">Zam Tutarı: <b>${fark.toFixed(2)} TL</b><br>Yeni Tutar: <b>${(mevcut + fark).toFixed(2)} TL</b></div>`;
        }
        else if (path.includes("logaritma")) {
            const sayi = parseFloat(document.getElementById("logSayi").value) || 0;
            const taban = parseFloat(document.getElementById("logTaban").value) || 10;
            const sonuc = Math.log(sayi) / Math.log(taban);
            sonucAlani.innerHTML = `<div class="alert alert-success">Logaritma Sonucu: <b>${sonuc.toFixed(4)}</b></div>`;
        }
        else if (path.includes("nakliye")) {
            const mesafe = parseFloat(document.getElementById("mesafe").value) || 0;
            const kmMaliyet = parseFloat(document.getElementById("kmMaliyet").value) || 0;
            sonucAlani.innerHTML = `<div class="alert alert-success">Toplam Nakliye Maliyeti: <b>${(mesafe * kmMaliyet).toFixed(2)} TL</b></div>`;
        }
        else if (path.includes("haftanin-gunu")) {
            const tarihStr = document.getElementById("haftaTarih").value;
            if(!tarihStr) { alert("Tarih seçin."); return; }
            const gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
            const gunIndex = new Date(tarihStr).getDay();
            sonucAlani.innerHTML = `<div class="alert alert-success">Seçilen Gün: <b>${gunler[gunIndex]}</b></div>`;
        }
        else if (path.includes("yas")) {
            const dogum = new Date(document.getElementById("dogumTarihi").value);
            const yas = new Date().getFullYear() - dogum.getFullYear();
            sonucAlani.innerHTML = `<div class="alert alert-success">Hesaplanan Yaş: <b>${yas}</b></div>`;
        }
        else {
            const tutar = parseFloat(document.getElementById("genelTutar")?.value) || 0;
            const oran = parseFloat(document.getElementById("genelOran")?.value) || 0;
            const sonuc = tutar + (tutar * oran / 100);
            sonucAlani.innerHTML = `<div class="alert alert-success">Hesaplama Başarılı.<br>Sonuç / Toplam: <b>${sonuc.toFixed(2)} TL</b></div>`;
        }
    });
});
