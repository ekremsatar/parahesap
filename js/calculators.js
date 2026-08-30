document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    const hesaplaBtn = document.getElementById("hesaplaBtn");
    const sonucAlani = document.getElementById("sonucAlani");

    if (!hesaplaBtn) return;

    // 1. KREDİ HESAPLAMA
    if (path.includes("kredi-hesaplama")) {
        hesaplaBtn.addEventListener("click", function () {
            const tutar = parseFloat(document.getElementById("tutar").value) || 0;
            const vade = parseInt(document.getElementById("vade").value) || 0;
            const faiz = parseFloat(document.getElementById("faiz").value) || 0;

            if (tutar <= 0 || vade <= 0 || faiz <= 0) {
                alert("Lütfen tüm alanları eksiksiz doldurun.");
                return;
            }

            const aylikFaiz = (faiz / 100) / 12;
            const taksit = (tutar * aylikFaiz * Math.pow(1 + aylikFaiz, vade)) / (Math.pow(1 + aylikFaiz, vade) - 1);
            const toplamOdeme = taksit * vade;

            sonucAlani.innerHTML = `
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-4 text-gray-800">
                    <p class="text-lg font-semibold mb-2">Hesaplama Sonucu:</p>
                    <p><strong>Aylık Taksit:</strong> ${taksit.toFixed(2)} TL</p>
                    <p><strong>Toplam Ödeme:</strong> ${toplamOdeme.toFixed(2)} TL</p>
                </div>
            `;
        });
    }

    // 2. KİRA ARTIŞ ORANI HESAPLAMA
    else if (path.includes("kira-artis-orani")) {
        hesaplaBtn.addEventListener("click", function () {
            const mevcutKira = parseFloat(document.getElementById("mevcutKira").value) || 0;
            const tufeOrani = parseFloat(document.getElementById("tufeOrani").value) || 0;

            if (mevcutKira <= 0 || tufeOrani <= 0) {
                alert("Lütfen geçerli değerler girin.");
                return;
            }

            const artisTutari = mevcutKira * (tufeOrani / 100);
            const yeniKira = mevcutKira + artisTutari;

            sonucAlani.innerHTML = `
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-4 text-gray-800">
                    <p class="text-lg font-semibold mb-2">Kira Artış Sonucu:</p>
                    <p><strong>Artış Tutarı:</strong> ${artisTutari.toFixed(2)} TL</p>
                    <p><strong>Yeni Kira Bedeli:</strong> ${yeniKira.toFixed(2)} TL</p>
                </div>
            `;
        });
    }

    // 3. FAİZ HESAPLAMA
    else if (path.includes("faiz-hesaplama")) {
        hesaplaBtn.addEventListener("click", function () {
            const anapara = parseFloat(document.getElementById("anapara").value) || 0;
            const oran = parseFloat(document.getElementById("faizOrani").value) || 0;
            const gun = parseInt(document.getElementById("vadeGun").value) || 365;

            if (anapara <= 0 || oran <= 0) {
                alert("Lütfen tüm alanları doldurun.");
                return;
            }

            const getiri = (anapara * (oran / 100) * gun) / 365;
            const toplamPara = anapara + getiri;

            sonucAlani.innerHTML = `
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-4 text-gray-800">
                    <p class="text-lg font-semibold mb-2">Faiz Getirisi Sonucu:</p>
                    <p><strong>Net Getiri:</strong> ${getiri.toFixed(2)} TL</p>
                    <p><strong>Toplam Tutar:</strong> ${toplamPara.toFixed(2)} TL</p>
                </div>
            `;
        });
    }

    // 4. ENFLASYON HESAPLAMA
    else if (path.includes("enflasyon-hesaplama")) {
        hesaplaBtn.addEventListener("click", function () {
            const baslangicTutar = parseFloat(document.getElementById("baslangicTutar").value) || 0;
            const enflasyonOrani = parseFloat(document.getElementById("enflasyonOrani").value) || 0;

            if (baslangicTutar <= 0 || enflasyonOrani <= 0) {
                alert("Lütfen geçerli değerler girin.");
                return;
            }

            const fark = baslangicTutar * (enflasyonOrani / 100);
            const guncelDeger = baslangicTutar + fark;

            sonucAlani.innerHTML = `
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-4 text-gray-800">
                    <p class="text-lg font-semibold mb-2">Enflasyon Hesaplama Sonucu:</p>
                    <p><strong>Değer Kaybı / Artış Farkı:</strong> ${fark.toFixed(2)} TL</p>
                    <p><strong>Güncel / Uyarlandığı Değer:</strong> ${guncelDeger.toFixed(2)} TL</p>
                </div>
            `;
        });
    }
});
