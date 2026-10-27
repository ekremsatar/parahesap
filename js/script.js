let apiRates = { USD: 49.79, EUR: 55.70, GBP: 66.45, ALTIN: 3150.00, CEYREK: 5150.00 };

function fetchLiveRates() {
    // Doğrudan güncel piyasa değerlerini banda yansıtıyoruz
    document.getElementById('t-usd').innerText = apiRates.USD.toFixed(2) + ' TL';
    document.getElementById('t-eur').innerText = apiRates.EUR.toFixed(2) + ' TL';
    document.getElementById('t-gbp').innerText = apiRates.GBP.toFixed(2) + ' TL';
    document.getElementById('t-gold').innerText = apiRates.ALTIN.toLocaleString('tr-TR', {minimumFractionDigits: 2}) + ' TL';
    document.getElementById('t-ceyrek').innerText = apiRates.CEYREK.toLocaleString('tr-TR', {minimumFractionDigits: 2}) + ' TL';
    document.getElementById('t-btc').innerText = "3,450,000 TL";
    document.getElementById('t-bist').innerText = "11,250 Puan";

    hesaplaCevirici();
}

function toggleDarkMode() { document.body.classList.toggle('dark-mode'); }

function switchTab(tabId, evt) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.main-card').forEach(card => card.classList.remove('active'));
    
    if(evt && evt.target) { 
        evt.target.classList.add('active'); 
    } else {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if(btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
                btn.classList.add('active');
            }
        });
    }
    const el = document.getElementById(tabId);
    if(el) {
        el.classList.add('active');
        window.scrollTo({ top: 120, behavior: 'smooth' });
    }
}

function aramaYap() {
    const val = document.getElementById('global-search').value.toLowerCase();
    if(val.includes('zekat')) switchTab('zekat', null);
    else if(val.includes('döviz') || val.includes('altın')) switchTab('cevirici', null);
    else if(val.includes('kur')) switchTab('gecmis-kur', null);
    else if(val.includes('fitre') || val.includes('nisap')) switchTab('nisap', null);
    else if(val.includes('kar') || val.includes('kâr')) switchTab('katilma', null);
    else if(val.includes('bist') || val.includes('hisse')) switchTab('katilim-endeks', null);
    else if(val.includes('rehber')) switchTab('rehber', null);
    else if(val.includes('sözlük')) switchTab('sozluk', null);
}

function filtreleBistSirketler() {
    const input = document.getElementById('bist-input-filter').value.toLowerCase();
    const items = document.querySelectorAll('#bist-sirket-container .bist-card-item');
    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(input) ? 'flex' : 'none';
    });
}

function gonderIletisimFormu(e) {
    e.preventDefault();
    document.getElementById('form-result').style.display = 'block';
    document.getElementById('contactForm').reset();
}

function hesaplaCevirici() {
    const miktar = parseFloat(document.getElementById('cev-miktar').value) || 0;
    const tur = document.getElementById('cev-tur').value;
    let kur = apiRates[tur] || 49.79;

    const res = miktar * kur;
    document.getElementById('res-cevirici-val').innerText = res.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
    document.getElementById('res-cevirici-sub').innerText = `1 ${tur} = ${kur.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL`;
}

function hesaplaNisapFitre() {
    const gf = parseFloat(document.getElementById('gram-fiyat').value) || 3150;
    const ks = parseInt(document.getElementById('kisi-sayisi').value) || 4;
    document.getElementById('res-nisap-esik').innerText = (gf * 80.18).toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' TL';
    document.getElementById('res-toplam-fitre').innerText = (ks * 180).toLocaleString('tr-TR') + ' TL';
}

function hesaplaGecmisKur() {
    const miktar = parseFloat(document.getElementById('gecmis-miktar').value) || 0;
    const yil = document.getElementById('kur-yil').value;
    let kur = yil === '2020' ? 7.20 : yil === '2025' ? 34.00 : apiRates.USD;
    document.getElementById('res-gecmis-val').innerText = (miktar * kur).toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' TL';
    document.getElementById('gecmis-sonuc').style.display = 'block';
}
function sifirlaGecmisKur() { document.getElementById('gecmis-miktar').value = ''; document.getElementById('gecmis-sonuc').style.display = 'none'; }

function hesaplaZekatYeni() {
    const tl = parseFloat(document.getElementById('z-tl').value) || 0;
    const usd = parseFloat(document.getElementById('z-usd').value) || 0;
    const borc = parseFloat(document.getElementById('z-borc-tl').value) || 0;
    const net = Math.max(0, (tl + (usd * apiRates.USD)) - borc);
    document.getElementById('res-zekat').innerText = (net * 0.025).toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' TL';
    document.getElementById('res-net').innerText = `Net Matrah: ${net.toLocaleString('tr-TR')} TL`;
    document.getElementById('zekat-sonuc').style.display = 'block';
}
function sifirlaZekat() { document.querySelectorAll('#zekat input').forEach(i => i.value = '0'); document.getElementById('zekat-sonuc').style.display = 'none'; }

function hesaplaKarPayi() {
    const ap = parseFloat(document.getElementById('anapara').value) || 0;
    const or = parseFloat(document.getElementById('oran').value) || 0;
    const net = Math.max(0, ((ap * or * 30) / 36500) * 0.85);
    document.getElementById('res-net-kar').innerText = net.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' TL';
}

function hesaplaFinansman() {
    const tutar = parseFloat(document.getElementById('finansman-tutar').value) || 0;
    const vade = parseInt(document.getElementById('finansman-vade').value) || 12;
    const taksit = (tutar * 1.25) / vade;
    document.getElementById('res-taksit').innerText = taksit.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' TL';
    document.getElementById('finansman-sonuc').style.display = 'block';
}

window.onload = function() {
    fetchLiveRates();
    hesaplaKarPayi();
    hesaplaNisapFitre();
    hesaplaCevirici();
};
