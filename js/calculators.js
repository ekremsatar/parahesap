document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    const formAlani = document.getElementById("hesaplamaAraci");

    if (!formAlani) return;

    let htmlIcerik = "";

    // 1. KREDİ HESAPLAMA
    if (path.includes("kredi-hesaplama")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Kredi Tutarı (TL)</label><input type="number" id="tutar" class="form-control" placeholder="Örn: 250000"></div>
            <div class="mb-3"><label class="form-label">Vade (Ay)</label><input type="number" id="vade" class="form-control" placeholder="Örn: 24"></div>
            <div class="mb-3"><label class="form-label">Faiz Oranı (Yıllık %)</label><input type="number" id="faiz" class="form-control" placeholder="Örn: 45"></div>
        `;
    } 
    // 2. KİRA ARTIŞ ORANI
    else if (path.includes("kira-artis-orani")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Mevcut Kira Bedeli (TL)</label><input type="number" id="mevcutKira" class="form-control" placeholder="Örn: 10000"></div>
            <div class="mb-3"><label class="form-label">TÜFE Oranı (%)</label><input type="number" id="tufeOrani" class="form-control" placeholder="Örn: 55"></div>
        `;
    } 
    // 3. KDV HESAPLAMA
    else if (path.includes("kdv-hesaplama")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Ürün Fiyatı (TL)</label><input type="number" id="urunFiyati" class="form-control" placeholder="Örn: 1000"></div>
            <div class="mb-3"><label class="form-label">KDV Oranı (%)</label><input type="number" id="kdvOrani" class="form-control" value="20"></div>
        `;
    } 
    // 4. KAREKÖK HESAPLAMA
    else if (path.includes("karekok-hesaplama")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Karekökü Alınacak Sayı</label><input type="number" id="sayi" class="form-control" placeholder="Örn: 144"></div>
        `;
    } 
    // 5. YAŞ HESAPLAMA
    else if (path.includes("yas-hesaplama")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Doğum Tarihi</label><input type="date" id="dogumTarihi" class="form-control"></div>
        `;
    } 
    // 6. ENFLASYON HESAPLAMA
    else if (path.includes("enflasyon-hesaplama")) {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Başlangıç Tutarı (TL)</label><input type="number" id="baslangicTutar" class="form-control" placeholder="Örn: 1000"></div>
            <div class="mb-3"><label class="form-label">Enflasyon Oranı (%)</label><input type="number" id="enflasyonOrani" class="form-control" placeholder="Örn: 30"></div>
        `;
    } 
    // DİĞER SAYFALAR İÇİN VARSAYILAN
    else {
        htmlIcerik = `
            <div class="mb-3"><label class="form-label">Ana Değer / Tutar:</label><input type="number" id="tutar" class="form-control" placeholder="Örn: 25000"></div>
            <div class="mb-3"><label class="form-label">Oran / Yüzde (%):</label><input type="number" id="oran" class="form-control" placeholder="Örn: 20"></div>
        `;
    }

    // Formu ve Hesapla Butonunu Ekrana Bas
    formAlani.innerHTML = `
        ${htmlIcerik}
        <button id="hesaplaBtn" class="btn btn-primary w-100 mt-2">Hesapla</button>
        <div id="sonucAlani" class="mt-3"></div>
    `;

    // HESAPLAMA TETİKLEYİCİSİ
    document.getElementById("hesaplaBtn").addEventListener("click", function () {
        const sonucAlani = document.getElementById("sonucAlani");

        if (path.includes("kredi-hesaplama")) {
            const tutar = parseFloat(document.getElementById("tutar").value) || 0;
            const vade = parseInt(document.getElementById("vade").value) || 0;
            const faiz = parseFloat(document.getElementById("faiz").value) || 0;
            if (tutar <= 0 || vade <= 0) { alert("Lütfen tüm alanları doldurun."); return; }
            const aylikFaiz = (faiz / 100) / 12;
            const taksit = (tutar * aylikFaiz * Math.pow(1 + aylikFaiz, vade)) / (Math.pow(1 + aylikFaiz, vade) - 1);
            sonucAlani.innerHTML = `<div class="alert alert-success">Aylık Taksit: <b>${taksit.toFixed(2)} TL</b><br>Toplam Ödeme: <b>${(taksit * vade).toFixed(2)} TL</b></div>`;
        } 
        else if (path.includes("kdv-hesaplama")) {
            const fiyat = parseFloat(document.getElementById("urunFiyati").value) || 0;
            const oran = parseFloat(document.getElementById("kdvOrani").value) || 0;
            const kdvTutar = fiyat * (oran / 100);
            sonucAlani.innerHTML = `<div class="alert alert-success">KDV Tutarı: <b>${kdvTutar.toFixed(2)} TL</b><br>Toplam Fiyat: <b>${(fiyat + kdvTutar).toFixed(2)} TL</b></div>`;
        }
        else if (path.includes("karekok-hesaplama")) {
            const sayi = parseFloat(document.getElementById("sayi").value) || 0;
            const sonuc = Math.sqrt(sayi);
            sonucAlani.innerHTML = `<div class="alert alert-success">Karekök Sonucu: <b>${sonuc.toFixed(4)}</b></div>`;
        }
        else if (path.includes("yas-hesaplama")) {
            const dogumTarihiStr = document.getElementById("dogumTarihi").value;
            if (!dogumTarihiStr) { alert("Lütfen doğum tarihi seçin."); return; }
            const dogum = new Date(dogumTarihiStr);
            const bugun = new Date();
            let yas = bugun.getFullYear() - dogum.getFullYear();
            sonucAlani.innerHTML = `<div class="alert alert-success">Hesaplanan Yaş: <b>${yas}</b></div>`;
        }
        else {
            sonucAlani.innerHTML = `<div class="alert alert-info">İşlem başarıyla tamamlandı.</div>`;
        }
    });
});
