// All figures in this prototype are illustrative demo data, not live reporting.
const channels = [
  { name: 'Meta', mark: 'f', spend: 286400, impressions: 1050000, clicks: 15600, leads: 188, qualified: 119, visits: 54, bookings: 10, revenue: 29600000, cpl: 1523, roas: 103.4 },
  { name: 'Google', mark: 'G', spend: 248200, impressions: 690000, clicks: 12800, leads: 142, qualified: 96, visits: 48, bookings: 9, revenue: 27100000, cpl: 1748, roas: 109.2 },
  { name: 'TikTok', mark: '♪', spend: 126800, impressions: 780000, clicks: 8200, leads: 91, qualified: 53, visits: 21, bookings: 3, revenue: 8500000, cpl: 1393, roas: 67.0 },
  { name: 'Property Portal', mark: '⌂', spend: 181200, impressions: 320000, clicks: 1820, leads: 65, qualified: 44, visits: 21, bookings: 4, revenue: 13200000, cpl: 2788, roas: 72.8 }
];
const campaigns = [
  { name: 'Jomtien Beachfront · Lead Gen', sub: 'Always-on · EN / TH', channel: 'Meta', spend: 146800, clicks: 8240, leads: 94, cpl: 1562, status: 'Active' },
  { name: 'AROM · High Intent Search', sub: 'Search · Brand & location', channel: 'Google', spend: 112400, clicks: 5180, leads: 68, cpl: 1653, status: 'Active' },
  { name: 'Your Sea, Your Sanctuary', sub: 'Video views · 15 sec', channel: 'TikTok', spend: 84900, clicks: 5680, leads: 57, cpl: 1489, status: 'Learning' },
  { name: 'Jomtien New Launch Listing', sub: 'Premium placement · TH', channel: 'Property Portal', spend: 97300, clicks: 920, leads: 36, cpl: 2703, status: 'Active' },
  { name: 'Return to the Jomtien Horizon', sub: 'Retargeting · Website visitors', channel: 'Meta', spend: 76200, clicks: 3940, leads: 51, cpl: 1494, status: 'Paused' },
  { name: 'Pattaya Condo Investment', sub: 'Search · Investment intent', channel: 'Google', spend: 68400, clicks: 3440, leads: 42, cpl: 1629, status: 'Active' },
  { name: 'Pool Villa Walkthrough', sub: 'Creator edit · 30 sec', channel: 'TikTok', spend: 41900, clicks: 2520, leads: 29, cpl: 1445, status: 'Active' },
  { name: 'Premium Sea View Residences', sub: 'Featured listing · EN', channel: 'Property Portal', spend: 51200, clicks: 480, leads: 18, cpl: 2844, status: 'Learning' },
  { name: 'Penthouse Collection', sub: 'Carousel · Luxury audience', channel: 'Meta', spend: 63400, clicks: 3420, leads: 43, cpl: 1474, status: 'Active' },
  { name: 'AROM Jomtien Brand Search', sub: 'Search · Exact match', channel: 'Google', spend: 67400, clicks: 4180, leads: 32, cpl: 2106, status: 'Active' },
  { name: 'Live the Jomtien Rhythm', sub: 'Lifestyle · Broad audience', channel: 'TikTok', spend: 0, clicks: 0, leads: 5, cpl: 0, status: 'Paused' },
  { name: 'Beachfront Condo Collection', sub: 'Standard listing · TH', channel: 'Property Portal', spend: 32700, clicks: 420, leads: 11, cpl: 2973, status: 'Active' }
];
const totals = { spend: 842600, impressions: 2840000, clicks: 38420, leads: 486, qualified: 312, visits: 144, bookings: 26, revenue: 78400000 };
const factorByDays = { 7: 0.24, 30: 1, 90: 2.72 };
let sortByLeads = true;
let language = localStorage.getItem('arom_lang') === 'th' ? 'th' : 'en';
const $ = (id) => document.getElementById(id);
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const money = (n) => '฿' + fmt(n);
const short = (n) => n >= 1000000 ? (n / 1000000).toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + 'M' : n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : fmt(n);
const staticThai = [
  ['.chart-summary .summary-label:last-child','ลูกค้าเป้าหมายที่ได้'],
  ['.workspace-label','พื้นที่ทำงาน'],['.nav','เมนูหลัก'],['.nav-item[href="../index.html"]','ศูนย์บัญชาการ'],['.nav-item[href="#overview"]','ภาพรวม'],['.nav-item[href="#analytics"]','วิเคราะห์การตลาด'],['.nav-item[href="#campaigns"]','แคมเปญ'],['.nav-item[href="#funnel"]','กรวยลูกค้า'],['.nav-item[href="#channels"]','ช่องทาง'],['.nav-item[href="../guide/index.html"]','<span class="nav-icon">?</span> คู่มือการใช้งาน'],['.project-mini small','ที่พักอาศัยริมทะเล'],['.profile small','ทีมการตลาด'],['.breadcrumbs','โครงการ <span>/</span> <b>AROM Jomtien</b>'],['.live-status','<i></i> พื้นที่ทำงานตัวอย่าง'],['.icon-button','♧<em></em>'],['.page-heading .eyebrow','<span class="eyebrow-line"></span> ภาพรวมประสิทธิภาพ <span class="demo-pill">ข้อมูลตัวอย่าง</span>'],['.page-heading h1','วิเคราะห์การตลาด'],['.subtitle','มองเห็นทุกจุดสัมผัส ตั้งแต่การรับรู้ครั้งแรกจนถึงการจอง'],['.export-button','<span>↓</span> ส่งออกรายงาน'],['.filter-control:nth-child(1) .filter-label','ช่วงเวลา'],['#dateFilter option[value="30"]','30 วันล่าสุด'],['#dateFilter option[value="7"]','7 วันล่าสุด'],['#dateFilter option[value="90"]','90 วันล่าสุด'],['.filter-control:nth-child(2) .filter-label','ช่องทาง'],['#channelFilter option[value="all"]','ทุกช่องทาง'],['#channelFilter option[value="Property Portal"]','พอร์ทัลอสังหาริมทรัพย์'],['.filter-note','<span class="sync-icon">↻</span> อัปเดตเมื่อสักครู่ <span class="note-sep">·</span> <span id="dateLabel">01 Sep – 30 Sep 2026</span>'],['.kpi-card:nth-child(1) .kpi-top>span:first-child','ค่าโฆษณา'],['.kpi-card:nth-child(2) .kpi-top>span:first-child','การแสดงผล'],['.kpi-card:nth-child(3) .kpi-top>span:first-child','คลิก'],['.kpi-card:nth-child(4) .kpi-top>span:first-child','ลูกค้าเป้าหมาย'],['.kpi-foot>span:nth-child(2)','เทียบช่วงก่อนหน้า'],['.performance-panel h2','ประสิทธิภาพตามช่วงเวลา'],['.performance-panel .panel-heading p','ติดตามค่าโฆษณาและจำนวนลูกค้าจากแต่ละช่องทาง'],['.legend span:nth-child(1)','<i class="legend-dot spend-dot"></i> ค่าโฆษณา'],['.legend span:nth-child(2)','<i class="legend-dot lead-dot"></i> ลูกค้าเป้าหมาย'],['.chart-summary .summary-label:nth-of-type(1)','ค่าโฆษณารวม'],['.chart-summary .summary-label:nth-of-type(2)','ลูกค้าเป้าหมายที่ได้'],['.funnel-panel h2','กรวยการเปลี่ยนเป็นลูกค้า'],['.funnel-panel .panel-heading p','จากการรับรู้ครั้งแรกจนถึงการจอง'],['.funnel-total>span:first-of-type','จำนวนการแสดงผลรวม'],['.funnel-range','30 วัน'],['.funnel-row:nth-child(1) .funnel-label span','การแสดงผล'],['.funnel-row:nth-child(2) .funnel-label span','คลิก'],['.funnel-row:nth-child(3) .funnel-label span','ลูกค้าเป้าหมาย'],['.funnel-row:nth-child(4) .funnel-label span','เข้าชมโครงการ'],['.funnel-row:nth-child(5) .funnel-label span','การจอง'],['.channel-panel h2','สรุปตามช่องทาง'],['.channel-panel .panel-heading p','ช่องทางที่ใช้งบการตลาดได้ผล'],['.channel-panel .text-link','ดูแคมเปญ <span>→</span>'],['.channel-head span:nth-child(1)','ช่องทาง'],['.channel-head span:nth-child(2)','ค่าโฆษณา'],['.channel-head span:nth-child(3)','ลูกค้า'],['.channel-head span:nth-child(4)','CPL'],['.channel-head span:nth-child(5)','ROAS'],['.quality-panel h2','คุณภาพลูกค้าเป้าหมาย'],['.quality-panel .panel-heading p','ความคืบหน้าหลังได้รับการติดต่อ'],['.quality-metrics>div:nth-child(1)>span','ลูกค้าที่ผ่านเกณฑ์'],['.quality-metrics>div:nth-child(1) small','ของลูกค้าทั้งหมด'],['.quality-metrics>div:nth-child(2)>span','เข้าชมโครงการ'],['.quality-metrics>div:nth-child(2) small','ของลูกค้าที่ผ่านเกณฑ์'],['.quality-bottom>div:nth-child(1)>span','การจอง'],['.quality-bottom>div:nth-child(2)>span','มูลค่าการจอง'],['.quality-bottom>div:nth-child(3)>span','ROAS'],['.cost-strip>span:nth-child(1)','CPL <b id="costPerLead">฿1,734</b>'],['.cost-strip>span:nth-child(2)','ค่าใช้จ่าย / เข้าชม <b id="costPerVisit">฿5,851</b>'],['.cost-strip>span:nth-child(3)','ค่าใช้จ่าย / จอง <b id="costPerBooking">฿32,408</b>'],['.quality-note','<span>↗</span> อัตราการเปลี่ยนเป็นลูกค้าเติบโตดีในช่วงนี้'],['.campaigns-panel h2','แคมเปญผลงานเด่น'],['.campaigns-panel .panel-heading p','ประสิทธิภาพแคมเปญในช่วงเวลาที่เลือก <span class="inline-demo">· ตัวอย่าง</span>'],['.table-filter','เรียงตามลูกค้า <span>⌄</span>'],['thead th:nth-child(1)','แคมเปญ'],['thead th:nth-child(2)','ช่องทาง'],['thead th:nth-child(3)','ค่าโฆษณา'],['thead th:nth-child(4)','คลิก'],['thead th:nth-child(5)','ลูกค้า'],['thead th:nth-child(6)','CPL'],['thead th:nth-child(7)','สถานะ'],['.footer span:first-child','© 2026 AROM Jomtien ระบบข้อมูลการตลาด'],['.footer span:last-child','ตัวเลขทั้งหมดเป็นภาพประกอบ <b>ข้อมูลตัวอย่าง</b>']
];
const originalStatic = new Map(staticThai.map(([selector]) => [selector, [...document.querySelectorAll(selector)].map(node => node.innerHTML)]));
const statusThai = { Active: 'กำลังทำงาน', Learning: 'กำลังเรียนรู้', Paused: 'หยุดชั่วคราว' };
const campaignSubThai = {
  'Always-on · EN / TH':'ทำงานต่อเนื่อง · อังกฤษ / ไทย','Search · Brand & location':'ค้นหา · แบรนด์และทำเล','Video views · 15 sec':'วิดีโอ 15 วินาที','Premium placement · TH':'ตำแหน่งพรีเมียม · ไทย','Retargeting · Website visitors':'รีมาร์เก็ตติ้ง · ผู้เข้าชมเว็บไซต์','Search · Investment intent':'ค้นหา · ความสนใจลงทุน','Creator edit · 30 sec':'วิดีโอครีเอเตอร์ 30 วินาที','Featured listing · EN':'ประกาศแนะนำ · อังกฤษ','Carousel · Luxury audience':'คารูเซล · กลุ่มลักชัวรี','Search · Exact match':'ค้นหา · คำค้นแบบตรง','Lifestyle · Broad audience':'ไลฟ์สไตล์ · กลุ่มเป้าหมายกว้าง','Standard listing · TH':'ประกาศมาตรฐาน · ไทย'
};
function setLanguage(next) {
  language = next; const thai = language === 'th'; document.documentElement.lang = language; localStorage.setItem('arom_lang', language);
staticThai.forEach(([selector, translation]) => { if (selector === '.nav') return; document.querySelectorAll(selector).forEach((node, i) => { node.innerHTML = thai ? translation : originalStatic.get(selector)[i]; }); });
  if (thai) { document.querySelector('.quality-metrics>div:nth-child(1) small').innerHTML = '<i>64.2%</i> ของลูกค้าทั้งหมด'; document.querySelector('.quality-metrics>div:nth-child(2) small').innerHTML = '<i>46.2%</i> ของลูกค้าที่ผ่านเกณฑ์'; }
  document.querySelector('.language-toggle').setAttribute('aria-label', thai ? 'เปลี่ยนภาษาเป็นอังกฤษ' : 'Switch language to Thai');
  document.querySelector('.language-toggle').innerHTML = thai ? 'TH <span>/</span> EN' : 'TH <span>/</span> EN';
  document.querySelector('#menuToggle').setAttribute('aria-label', thai ? 'เปิดเมนูนำทาง' : 'Toggle navigation');
  document.querySelector('.nav').setAttribute('aria-label', thai ? 'เมนูหลัก' : 'Main navigation');
  document.querySelector('#dateFilter').setAttribute('aria-label', thai ? 'เลือกช่วงวันที่' : 'Date range');
  document.querySelector('#channelFilter').setAttribute('aria-label', thai ? 'เลือกช่องทาง' : 'Channel');
  document.querySelector('#exportBtn').setAttribute('aria-label', thai ? 'ส่งออกรายงาน' : 'Export report');
  document.querySelector('.filter-row').setAttribute('aria-label', thai ? 'ตัวกรองแดชบอร์ด' : 'Dashboard filters');
  document.querySelector('#overview').setAttribute('aria-label', thai ? 'ตัวชี้วัดผลการดำเนินงานหลัก' : 'Key performance metrics');
  document.querySelectorAll('.dots-button').forEach(button => button.setAttribute('aria-label', thai ? 'ตัวเลือกแผงข้อมูล' : (button.closest('.funnel-panel') ? 'Funnel options' : 'Chart options')));
  document.querySelector('.pagination button:first-child').setAttribute('aria-label', thai ? 'หน้าก่อนหน้า' : 'Previous page');
  document.querySelector('.pagination button:last-child').setAttribute('aria-label', thai ? 'หน้าถัดไป' : 'Next page');
  document.querySelector('#tableSort').innerHTML = thai ? `เรียงตาม${sortByLeads ? 'ลูกค้า' : 'ค่าโฆษณา'} <span>⌄</span>` : `Sort by ${sortByLeads ? 'leads' : 'spend'} <span>⌄</span>`;
  document.querySelector('#performanceChart').setAttribute('aria-label', thai ? 'กราฟแนวโน้มค่าโฆษณาและลูกค้าเป้าหมาย' : 'Spend and leads trend chart');
  document.title = thai ? 'AROM Jomtien — ข้อมูลเชิงลึกการตลาด' : 'AROM Jomtien — Marketing Intelligence';
  render();
}
function getView() {
  const factor = factorByDays[$('dateFilter').value] || 1;
  const selected = $('channelFilter').value;
  const rows = channels.filter(c => selected === 'all' || c.name === selected);
  const sums = rows.reduce((a, c) => {
    for (const key of ['spend','impressions','clicks','leads','qualified','visits','bookings','revenue']) a[key] += c[key];
    return a;
  }, { spend:0, impressions:0, clicks:0, leads:0, qualified:0, visits:0, bookings:0, revenue:0 });
  for (const key of Object.keys(sums)) sums[key] = Math.round(sums[key] * factor);
  return { factor, selected, rows, sums };
}
function setText(id, text) { $(id).textContent = text; }
function renderChannels(rows, factor) {
  $('channelList').innerHTML = rows.map(c => `<div class="channel-row"><span class="channel-name"><i class="channel-mark mark-${c.name === 'Property Portal' ? 'portal' : c.name.toLowerCase()}" aria-hidden="true">${c.mark}</i>${c.name}</span><span>${money(c.spend * factor)}</span><span>${fmt(c.leads * factor)}</span><span class="cpl">${money(c.cpl)}</span><span class="roas-chip">${c.roas.toFixed(1)}×</span></div>`).join('');
  if (language === 'th') [...$('channelList').querySelectorAll('.channel-name')].forEach(el => { if (el.textContent.includes('Property Portal')) el.lastChild.textContent = 'พอร์ทัลอสังหาริมทรัพย์'; });
}
function renderCampaigns(selected) {
  const filtered = campaigns.filter(c => selected === 'all' || c.channel === selected);
  const sorted = [...filtered].sort((a,b) => sortByLeads ? b.leads-a.leads : b.spend-a.spend).slice(0,5);
  $('campaignRows').innerHTML = sorted.length ? sorted.map(c => `<tr><td><div class="campaign-name">${c.name}</div><div class="campaign-sub">${c.sub}</div></td><td><span class="channel-badge"><i class="mark-${c.channel === 'Property Portal' ? 'portal' : c.channel.toLowerCase()}">${c.channel === 'Property Portal' ? '⌂' : channels.find(x => x.name === c.channel).mark}</i>${c.channel}</span></td><td>${money(c.spend)}</td><td>${fmt(c.clicks)}</td><td>${fmt(c.leads)}</td><td>${money(c.cpl)}</td><td><span class="status ${c.status.toLowerCase()}">${c.status}</span></td></tr>`).join('') : '<tr><td colspan="7" class="empty-state">No campaign data for this channel.</td></tr>';
  if (language === 'th') {
    const nameThai = ['จอมเทียน บีชฟรอนต์ · รับลูกค้าเป้าหมาย','AROM · ค้นหาความสนใจสูง','ทะเลของคุณ สถานพักใจของคุณ','ประกาศเปิดตัวใหม่จอมเทียน','กลับสู่ขอบฟ้าจอมเทียน','ลงทุนคอนโดพัทยา','พาชมพูลวิลล่า','ที่พักวิวทะเลระดับพรีเมียม','คอลเลกชันเพนต์เฮาส์','ค้นหาแบรนด์ AROM Jomtien','ใช้ชีวิตในจังหวะจอมเทียน','คอลเลกชันคอนโดริมทะเล'];
    [...$('campaignRows').querySelectorAll('.campaign-name')].forEach(el => { const index = campaigns.findIndex(c => c.name === el.textContent); if (index >= 0) el.textContent = nameThai[index]; });
    const subThai = ['ทำงานต่อเนื่อง · อังกฤษ / ไทย','ค้นหา · แบรนด์และทำเล','วิดีโอ 15 วินาที','ตำแหน่งพรีเมียม · ไทย','รีมาร์เก็ตติ้ง · ผู้เข้าชมเว็บไซต์','ค้นหา · ความสนใจลงทุน','วิดีโอครีเอเตอร์ 30 วินาที','ประกาศแนะนำ · อังกฤษ','คารูเซล · กลุ่มลักชัวรี','ค้นหา · คำค้นแบบตรง','ไลฟ์สไตล์ · กลุ่มเป้าหมายกว้าง','ประกาศมาตรฐาน · ไทย'];
    [...$('campaignRows').querySelectorAll('.campaign-sub')].forEach(el => { const index = campaigns.findIndex(c => c.sub === el.textContent); if (index >= 0) el.textContent = subThai[index]; });
    [...$('campaignRows').querySelectorAll('.status')].forEach(el => { el.textContent = ({Active:'กำลังทำงาน',Learning:'กำลังเรียนรู้',Paused:'หยุดชั่วคราว'})[el.textContent]; });
    [...$('campaignRows').querySelectorAll('.channel-badge')].forEach(el => { if (el.textContent.includes('Property Portal')) el.lastChild.textContent = 'พอร์ทัลอสังหาริมทรัพย์'; });
  }
  setText('tableCount', language === 'th' ? `แสดง ${Math.min(5,filtered.length)} จาก ${filtered.length} แคมเปญ` : `Showing ${Math.min(5,filtered.length)} of ${filtered.length} campaigns`);
}
function render() {
  const { factor, selected, rows, sums } = getView();
  setText('spend', money(sums.spend)); setText('impressions', short(sums.impressions)); setText('clicks', fmt(sums.clicks)); setText('leads', fmt(sums.leads));
  setText('chartSpend', money(sums.spend)); setText('chartLeads', fmt(sums.leads)); setText('funnelImpressions', short(sums.impressions));
  setText('qualifiedLeads', fmt(sums.qualified)); setText('visits', fmt(sums.visits)); setText('bookings', fmt(sums.bookings)); setText('revenue', '฿' + (sums.revenue/1000000).toFixed(1) + 'M');
  setText('roas', sums.spend ? (sums.revenue/sums.spend).toFixed(1) + '×' : '—');
  setText('costPerLead', sums.leads ? money(sums.spend/sums.leads) : '—');
  setText('costPerVisit', sums.visits ? money(sums.spend/sums.visits) : '—');
  setText('costPerBooking', sums.bookings ? money(sums.spend/sums.bookings) : '—');
  setText('funnelImpNum', language === 'th' ? `เข้าถึง ${fmt(sums.impressions)} คน` : `${fmt(sums.impressions)} people reached`); setText('funnelClickNum', language === 'th' ? `เข้าชมเว็บไซต์ ${fmt(sums.clicks)} ครั้ง` : `${fmt(sums.clicks)} website visits`); setText('funnelLeadNum', language === 'th' ? `ได้รับการติดต่อ ${fmt(sums.leads)} ราย` : `${fmt(sums.leads)} enquiries received`); setText('funnelVisitNum', language === 'th' ? `เข้าชมโครงการที่ผ่านเกณฑ์ ${fmt(sums.visits)} ราย` : `${fmt(sums.visits)} qualified visits`); setText('funnelBookingNum', language === 'th' ? `ทำการจอง ${fmt(sums.bookings)} รายการ` : `${fmt(sums.bookings)} reservations made`);
  setText('funnelImpPct', '100%'); setText('funnelClickPct', sums.impressions ? (sums.clicks/sums.impressions*100).toFixed(1)+'%' : '0%'); setText('funnelLeadPct', sums.clicks ? (sums.leads/sums.clicks*100).toFixed(1)+'%' : '0%'); setText('funnelVisitPct', sums.qualified ? (sums.visits/sums.qualified*100).toFixed(1)+'%' : '0%'); setText('funnelBookingPct', sums.visits ? (sums.bookings/sums.visits*100).toFixed(1)+'%' : '0%');
  renderChannels(rows, factor); renderCampaigns(selected);
  const days = $('dateFilter').value;
  const dateText = days === '7' ? '24 Sep – 30 Sep 2026' : days === '90' ? '03 Jul – 30 Sep 2026' : '01 Sep – 30 Sep 2026';
  setText('dateLabel', dateText);
  document.querySelector('.funnel-range').textContent = language === 'th' ? `${days} วัน` : `${days} days`;
}
function toast(message) { const el = $('toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2600); }
$('dateFilter').addEventListener('change', render);
$('channelFilter').addEventListener('change', render);
$('tableSort').addEventListener('click', () => { sortByLeads = !sortByLeads; $('tableSort').innerHTML = language === 'th' ? `เรียงตาม${sortByLeads ? 'ลูกค้า' : 'ค่าโฆษณา'} <span>⌄</span>` : `Sort by ${sortByLeads ? 'leads' : 'spend'} <span>⌄</span>`; renderCampaigns($('channelFilter').value); });
$('exportBtn').addEventListener('click', () => {
  const { rows, sums } = getView();
  const th = language === 'th'; const headers = th ? ['ตัวชี้วัด','ช่วงเวลา','ช่องทาง','ค่าโฆษณา THB','การแสดงผล','คลิก','ลูกค้าเป้าหมาย','ลูกค้าที่ผ่านเกณฑ์','เข้าชมโครงการ','การจอง','มูลค่าจอง THB'] : ['Metric','Period','Channel','Spend THB','Impressions','Clicks','Leads','Qualified leads','Site visits','Bookings','Revenue THB'];
  const lines = [[headers[0],th?'ค่าตัวอย่าง':'Demo value'],[headers[1],$('dateLabel').textContent],[headers[2],$('channelFilter').value],[headers[3],sums.spend],[headers[4],sums.impressions],[headers[5],sums.clicks],[headers[6],sums.leads],[headers[7],sums.qualified],[headers[8],sums.visits],[headers[9],sums.bookings],[headers[10],sums.revenue],...rows.map(c=>[`${th ? 'ค่าโฆษณาช่องทาง' : 'Channel spend'}: ${c.name}`,Math.round(c.spend * getView().factor)])];
  const csv = lines.map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\r\n');
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'})); link.download = 'arom-jomtien-demo-marketing-report.csv'; link.click(); URL.revokeObjectURL(link.href); toast(language === 'th' ? 'ดาวน์โหลดรายงานตัวอย่างเป็น CSV แล้ว' : 'Demo report downloaded as CSV');
});
$('menuToggle').addEventListener('click', () => $('sidebar').classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach(link => link.addEventListener('click', () => { if (innerWidth <= 900) $('sidebar').classList.remove('open'); }));
document.querySelectorAll('.pagination button:not(:disabled)').forEach((button, index) => button.addEventListener('click', () => { toast(language === 'th' ? `เปลี่ยนหน้าตัวอย่าง · หน้า ${index === 0 ? 1 : index}` : `Demo pagination · page ${index === 0 ? 1 : index}`); }));
document.querySelector('.language-toggle').addEventListener('click', () => setLanguage(language === 'th' ? 'en' : 'th'));
setLanguage(language);
