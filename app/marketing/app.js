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
const $ = (id) => document.getElementById(id);
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const money = (n) => '฿' + fmt(n);
const short = (n) => n >= 1000000 ? (n / 1000000).toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + 'M' : n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : fmt(n);
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
}
function renderCampaigns(selected) {
  const filtered = campaigns.filter(c => selected === 'all' || c.channel === selected);
  const sorted = [...filtered].sort((a,b) => sortByLeads ? b.leads-a.leads : b.spend-a.spend).slice(0,5);
  $('campaignRows').innerHTML = sorted.length ? sorted.map(c => `<tr><td><div class="campaign-name">${c.name}</div><div class="campaign-sub">${c.sub}</div></td><td><span class="channel-badge"><i class="mark-${c.channel === 'Property Portal' ? 'portal' : c.channel.toLowerCase()}">${c.channel === 'Property Portal' ? '⌂' : channels.find(x => x.name === c.channel).mark}</i>${c.channel}</span></td><td>${money(c.spend)}</td><td>${fmt(c.clicks)}</td><td>${fmt(c.leads)}</td><td>${money(c.cpl)}</td><td><span class="status ${c.status.toLowerCase()}">${c.status}</span></td></tr>`).join('') : '<tr><td colspan="7" class="empty-state">No campaign data for this channel.</td></tr>';
  setText('tableCount', `Showing ${Math.min(5,filtered.length)} of ${filtered.length} campaigns`);
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
  setText('funnelImpNum', `${fmt(sums.impressions)} people reached`); setText('funnelClickNum', `${fmt(sums.clicks)} website visits`); setText('funnelLeadNum', `${fmt(sums.leads)} enquiries received`); setText('funnelVisitNum', `${fmt(sums.visits)} qualified visits`); setText('funnelBookingNum', `${fmt(sums.bookings)} reservations made`);
  setText('funnelImpPct', '100%'); setText('funnelClickPct', sums.impressions ? (sums.clicks/sums.impressions*100).toFixed(1)+'%' : '0%'); setText('funnelLeadPct', sums.clicks ? (sums.leads/sums.clicks*100).toFixed(1)+'%' : '0%'); setText('funnelVisitPct', sums.qualified ? (sums.visits/sums.qualified*100).toFixed(1)+'%' : '0%'); setText('funnelBookingPct', sums.visits ? (sums.bookings/sums.visits*100).toFixed(1)+'%' : '0%');
  renderChannels(rows, factor); renderCampaigns(selected);
  const days = $('dateFilter').value;
  const dateText = days === '7' ? '24 Sep – 30 Sep 2026' : days === '90' ? '03 Jul – 30 Sep 2026' : '01 Sep – 30 Sep 2026';
  setText('dateLabel', dateText);
  document.querySelector('.funnel-range').textContent = `${days} days`;
}
function toast(message) { const el = $('toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2600); }
$('dateFilter').addEventListener('change', render);
$('channelFilter').addEventListener('change', render);
$('tableSort').addEventListener('click', () => { sortByLeads = !sortByLeads; $('tableSort').innerHTML = `Sort by ${sortByLeads ? 'leads' : 'spend'} <span>⌄</span>`; renderCampaigns($('channelFilter').value); });
$('exportBtn').addEventListener('click', () => {
  const { rows, sums } = getView();
  const lines = [['Metric','Demo value'],['Period',$('dateLabel').textContent],['Channel',$('channelFilter').value],['Spend THB',sums.spend],['Impressions',sums.impressions],['Clicks',sums.clicks],['Leads',sums.leads],['Qualified leads',sums.qualified],['Site visits',sums.visits],['Bookings',sums.bookings],['Revenue THB',sums.revenue],...rows.map(c=>[`Channel spend: ${c.name}`,Math.round(c.spend * getView().factor)])];
  const csv = lines.map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\r\n');
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'})); link.download = 'arom-jomtien-demo-marketing-report.csv'; link.click(); URL.revokeObjectURL(link.href); toast('Demo report downloaded as CSV');
});
$('menuToggle').addEventListener('click', () => $('sidebar').classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach(link => link.addEventListener('click', () => { if (innerWidth <= 900) $('sidebar').classList.remove('open'); }));
document.querySelectorAll('.pagination button:not(:disabled)').forEach((button, index) => button.addEventListener('click', () => { toast(`Demo pagination · page ${index === 0 ? 1 : index}`); }));
render();
