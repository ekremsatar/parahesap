function fmtTL(n){
  return n.toLocaleString('tr-TR', {maximumFractionDigits: 2, minimumFractionDigits: 2}) + ' ₺';
}
function fmtPct(n){
  return n.toLocaleString('tr-TR', {maximumFractionDigits: 2}) + ' %';
}

function hesaplaKredi(){
  const tutar = parseFloat(document.getElementById('krediTutar').value);
  const oran = parseFloat(document.getElementById('krediOran').value);
  const vade = parseInt(document.getElementById('krediVade').value);

  if(!tutar || !oran || !vade || tutar<=0 || vade<=0){
    alert('Lütfen tüm alanları geçerli değerlerle doldurun.');
    return;
  }

  const aylikOran = oran/100;
  const taksit = tutar * (aylikOran * Math.pow(1+aylikOran, vade)) / (Math.pow(1+aylikOran, vade)-1);
  const toplamOdeme = taksit * vade;
  const toplamFaiz = toplamOdeme - tutar;

  document.getElementById('kredi-taksit').textContent = fmtTL(taksit);
  document.getElementById('kredi-toplam').textContent = fmtTL(toplamOdeme);
  document.getElementById('kredi-faiz').textContent = fmtTL(toplamFaiz);
  document.getElementById('krediReceipt').classList.add('show');
}

function hesaplaFaiz(){
  const anapara = parseFloat(document.getElementById('faizAnapara').value);
  const oran = parseFloat(document.getElementById('faizOran').value);
  const yil = parseFloat(document.getElementById('faizYil').value);
  const aylikEkleme = parseFloat(document.getElementById('faizAylik').value) || 0;

  if(!anapara || !oran || !yil || anapara<=0 || yil<=0){
    alert('Lütfen tüm alanları geçerli değerlerle doldurun.');
    return;
  }

  const aylikOran = (oran/100)/12;
  const ay = yil*12;
  let bakiye = anapara;
  for(let i=0;i<ay;i++){
    bakiye = bakiye*(1+aylikOran) + aylikEkleme;
  }
  const toplamKatki = anapara + (aylikEkleme*ay);
  const kazanc = bakiye - toplamKatki;

  document.getElementById('faiz-son').textContent = fmtTL(bakiye);
  document.getElementById('faiz-katki').textContent = fmtTL(toplamKatki);
  document.getElementById('faiz-kazanc').textContent = fmtTL(kazanc);
  document.getElementById('faizReceipt').classList.add('show');
}

function hesaplaEnflasyon(){
  const tutar = parseFloat(document.getElementById('enfTutar').value);
  const oran = parseFloat(document.getElementById('enfOran').value);
  const yil = parseFloat(document.getElementById('enfYil').value);

  if(!tutar || !oran || !yil || tutar<=0 || yil<=0){
    alert('Lütfen tüm alanları geçerli değerlerle doldurun.');
    return;
  }

  const gelecekDeger = tutar * Math.pow(1+(oran/100), yil);
  const kaybedilenDeger = gelecekDeger - tutar;
  const alimGucuOrani = (tutar/gelecekDeger)*100;

  document.getElementById('enf-gelecek').textContent = fmtTL(gelecekDeger);
  document.getElementById('enf-kayip').textContent = fmtTL(kaybedilenDeger);
  document.getElementById('enf-guc').textContent = fmtPct(alimGucuOrani);
  document.getElementById('enfReceipt').classList.add('show');
}
