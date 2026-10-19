const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const languageButton = document.querySelector('.language-toggle');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  navigation.classList.toggle('open', !isOpen);
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('open');
}));

const thaiCopy = [
  ['.demo-ribbon', 'เว็บไซต์ตัวอย่าง <span>·</span> ภาพและข้อความประกอบเพื่อแนวคิด บันทึกข้อมูลเฉพาะในเครื่อง <span>·</span> <a href="../index.html">เปิดศูนย์ควบคุม ↗</a>'],
  ['.primary-nav a:nth-child(1)', 'ศูนย์ควบคุม'], ['.primary-nav a:nth-child(2)', 'เรื่องราว'], ['.primary-nav a:nth-child(3)', 'ที่พักอาศัย'], ['.primary-nav a:nth-child(4)', 'ประสบการณ์'], ['.primary-nav a:nth-child(5)', 'ทำเล'], ['.nav-cta', 'สอบถามข้อมูล <span>↗</span>'],
  ['.hero-content .eyebrow', 'หาดจอมเทียน · พัทยา'], ['#hero-title', 'ความสงบที่<br>แสน <em>พิเศษ</em>'], ['.hero-sub', 'พื้นที่พักผ่อนริมทะเล ที่ให้จังหวะของคลื่นเป็นส่วนหนึ่งของทุกวัน'], ['.button-light', 'ค้นพบ AROM <span>↗</span>'], ['.hero-caption span:last-child', 'สัมผัสเสน่ห์แห่งความสงบ'], ['.hero>.demo-tag', 'ภาพแนวคิดประกอบ'], ['.scroll-cue', 'เลื่อนเพื่อค้นพบ <span>↓</span>'],
  ['.intro-aside .eyebrow', '01 / ความแตกต่างของ AROM'], ['.vertical-note', 'มุมมองใหม่ของจอมเทียน'], ['.intro-copy .eyebrow', 'สัมผัสเสน่ห์แห่งความสงบ'], ['.intro-copy h2', 'สร้างขึ้นเพื่อช่วงเวลา<br>ที่ <em>อยู่ในใจ</em>'], ['.intro-copy .body-large', 'บางสถานที่ชวนให้คุณใช้ชีวิตช้าลง AROM Jomtien ชวนให้คุณสัมผัสทุกความรู้สึก ทั้งแสงอุ่นยามเช้า ความสงบของคลื่น และความสบายใจเมื่อกลับถึงบ้าน'], ['.intro-copy .text-link', 'สำรวจที่พักอาศัย <span>↗</span>'], ['.intro-stats div:nth-child(1) span', 'ชั้นเหนือ<br>แนวชายฝั่ง'], ['.intro-stats div:nth-child(2) span', 'ที่พักอาศัย<br>ส่วนตัว'], ['.intro-stats div:nth-child(3) span', 'ทำเลริม<br>ทะเล'],
  ['.feature-strip div:nth-of-type(1) span', 'ที่ตั้ง'], ['.feature-strip div:nth-of-type(1) strong', 'ถนนเลียบหาดจอมเทียน'], ['.feature-strip div:nth-of-type(2) span', 'คอลเลกชัน'], ['.feature-strip div:nth-of-type(2) strong', '1–2 ห้องนอน · พูลวิลล่า · เพนต์เฮาส์'], ['.feature-strip div:nth-of-type(3) span', 'กรรมสิทธิ์'], ['.feature-strip div:nth-of-type(3) strong', 'กรรมสิทธิ์ Freehold'],
  ['.residences .eyebrow', '02 / ขอบฟ้าในแบบของคุณ'], ['.residences h2', 'พื้นที่ให้คุณรู้สึก<br><em>เหมือนบ้าน</em>'], ['.heading-note', 'คอลเลกชันที่พักอาศัยส่วนตัวที่ใส่ใจทุกรายละเอียด โอบรับแสง ความสงบ และวิวทะเล'], ['.card-one .card-info>span', '1–2 ห้องนอน'], ['.card-one h3', 'การใช้ชีวิตอย่างลงตัว'], ['.card-one .card-info p', 'พื้นที่โปร่งสว่างสำหรับทุกช่วงเวลาของวัน'], ['.card-two .card-info>span', 'พูลวิลล่าส่วนตัว'], ['.card-two h3', 'เป็นส่วนตัวอย่างมีดีไซน์'], ['.card-two .card-info p', 'พื้นที่พักผ่อนส่วนตัว พร้อมสายน้ำใกล้เพียงก้าว'], ['.card-three .card-info>span', 'เพนต์เฮาส์'], ['.card-three h3', 'เหนือระดับทุกวัน'], ['.card-three .card-info p', 'มุมมองเหนือขอบฟ้า พร้อมพื้นที่ในแบบของคุณ'], ['.fine-print', 'ภาพและคำบรรยายเพื่อประกอบแนวคิดเท่านั้น รายละเอียดโครงการจริงเป็นไปตามข้อมูลที่ประกาศอย่างเป็นทางการ'],
  ['.experience-copy .eyebrow', '03 / ยกระดับทุกวัน'], ['.experience h2', 'ค้นพบจังหวะ<br><em>ของคุณ</em>'], ['.experience-copy>p:not(.eyebrow)', 'ตั้งแต่ว่ายน้ำยามเช้าไปจนถึงช่วงเวลาพักใจยามเย็น สำรวจพื้นที่ที่ชวนให้กลับมาใส่ใจกับสิ่งสำคัญ'], ['.amenities span:nth-child(1)', 'สระว่ายน้ำอินฟินิตี้'], ['.amenities span:nth-child(2)', 'สุขภาพและฟิตเนส'], ['.amenities span:nth-child(3)', 'เลานจ์ส่วนตัว'], ['.amenities span:nth-child(4)', 'สวนภูมิทัศน์'], ['.button-outline', 'สัมผัสประสบการณ์ <span>↗</span>'], ['.experience-art .demo-tag', 'ภาพแนวคิดประกอบ'],
  ['.location-copy .eyebrow', '04 / พื้นที่ที่ใช่'], ['.location h2', 'ใกล้ทุกสิ่ง<br>ที่คุณ <em>รัก</em>'], ['.location .body-large', 'จอมเทียนผสานจังหวะสบาย ๆ ของชายฝั่งเข้ากับสีสันของเมือง ทั้งหมดเริ่มต้นได้จากบ้านริมทะเลของคุณ'], ['.location .text-link', 'ค้นหาเส้นทางสู่ AROM <span>↗</span>'], ['.map-sea', 'อ่าวไทย'], ['.label-beach', 'หาดจอมเทียน'], ['.label-city', 'เมืองพัทยา'], ['.label-road', 'ถนนเลียบหาดจอมเทียน'], ['.map-card .demo-tag', 'แผนที่แนวคิด · ไม่ใช่มาตราส่วนจริง'], ['.map-marker>span:last-child', 'AROM จอมเทียน'],
  ['.enquire-copy .eyebrow', 'บทใหม่ของคุณเริ่มต้นที่นี่'], ['.enquire h2', 'ให้ทะเล<br><em>พาคุณกลับบ้าน</em>'], ['.enquire-copy>p:not(.eyebrow)', 'ฝากข้อมูลไว้ แล้วทีมงานจะติดต่อกลับพร้อมรายละเอียดเพิ่มเติมเกี่ยวกับ AROM Jomtien'], ['.contact-note span:nth-of-type(1)', 'เจ้าของโครงการ'], ['.contact-note span:nth-of-type(2)', 'ผู้พัฒนาโครงการ'], ['.form-eyebrow', 'ลงทะเบียนรับข้อมูล <span>แบบฟอร์มตัวอย่าง</span>'], ['label[for="name"]', 'ชื่อ-นามสกุล'], ['#name', ''], ['label[for="email"]', 'อีเมล'], ['label[for="phone"]', 'หมายเลขโทรศัพท์ <span class="optional">ไม่บังคับ</span>'], ['.consent span', 'ฉันยินยอมให้ติดต่อเกี่ยวกับ AROM Jomtien แบบฟอร์มตัวอย่างนี้จะบันทึกข้อมูลไว้ในเบราว์เซอร์นี้เท่านั้น เพื่อแสดงในระบบ CRM ตัวอย่าง'], ['.button-dark', 'ขอรับข้อมูล <span>↗</span>'], ['.footer-demo', 'เว็บไซต์แนวคิด · ไม่ใช่เว็บไซต์ทางการของโครงการ'], ['.copyright', 'ดูข้อมูลผู้สนใจใน CRM ↗'],
  ['.concept-gallery .eyebrow', 'ภาพแนวคิดประกอบ'], ['.concept-gallery h2', 'พื้นที่ส่วนตัว<br><em>ที่งดงามในจินตนาการ</em>'], ['.concept-gallery .heading-note', 'ภาพบรรยากาศของพื้นที่และช่วงเวลาแห่งการพักผ่อน ที่อาจเป็นส่วนหนึ่งของชีวิตที่ AROM Jomtien'], ['.concept-feature:nth-of-type(1) .eyebrow', 'พูลวิลล่าส่วนตัว'], ['.concept-feature:nth-of-type(1) h3', 'พื้นที่พักผ่อนในแบบของคุณ'], ['.concept-feature:nth-of-type(1) div>p:not(.eyebrow)', 'ก้าวจากพื้นที่ภายในที่โปร่งสบายสู่สายน้ำ พูลวิลล่าส่วนตัวมอบช่วงเวลาแห่งความสงบ สำหรับพักผ่อน พบปะ และใช้ชีวิตในแบบของคุณ'], ['.concept-feature:nth-of-type(1) .text-link', 'สอบถามพูลวิลล่า <span>↗</span>'], ['.concept-feature:nth-of-type(2) .eyebrow', 'เพนต์เฮาส์'], ['.concept-feature:nth-of-type(2) h3', 'พื้นที่เหนือทุกความธรรมดา'], ['.concept-feature:nth-of-type(2) div>p:not(.eyebrow)', 'เปิดรับวิวกว้างขวาง พื้นที่ใช้ชีวิตที่โอ่โถง และความรู้สึกพิเศษตั้งแต่แรกมาถึง เพนต์เฮาส์คืออีกนิยามของการใช้ชีวิตริมทะเล'], ['.concept-feature:nth-of-type(2) .text-link', 'สอบถามเพนต์เฮาส์ <span>↗</span>'], ['.concept-feature:nth-of-type(3) .eyebrow', 'ภาพแนวคิดประกอบ'], ['.concept-feature:nth-of-type(3) h3', 'ชีวิตในจังหวะที่ผ่อนคลาย'], ['.concept-feature:nth-of-type(3) div>p:not(.eyebrow)', 'ตั้งแต่แสงแรกจนถึงแสงสุดท้ายเหนืออ่าว จินตนาการถึงบ้านที่ถ่ายทอดความรู้สึกของการอยู่ใกล้ทะเล']
];
const englishCopy = new Map(thaiCopy.map(([selector]) => [selector, [...document.querySelectorAll(selector)].map((node) => node.innerHTML)]));
function setLanguage(language) {
  const isThai = language === 'th';
  document.documentElement.lang = language;
  localStorage.setItem('arom_lang', language);
  thaiCopy.forEach(([selector, translation]) => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node, index) => { node.innerHTML = isThai ? translation : englishCopy.get(selector)[index]; });
  });
  document.querySelector('#name').placeholder = isThai ? 'ชื่อของคุณ' : 'Your name';
  document.querySelector('#email').placeholder = isThai ? 'you@example.com' : 'you@example.com';
  document.querySelector('#phone').placeholder = '+66';
  document.querySelector('.language-toggle').innerHTML = isThai ? 'TH <span>/</span> EN' : 'TH <span>/</span> EN';
  document.querySelector('.language-toggle').setAttribute('aria-label', isThai ? 'เปลี่ยนภาษาเป็นอังกฤษ' : 'Switch language to Thai');
  document.querySelector('.menu-toggle').setAttribute('aria-label', isThai ? 'เปิดเมนู' : 'Open menu');
  document.querySelector('.primary-nav').setAttribute('aria-label', isThai ? 'เมนูหลัก' : 'Main navigation');
  document.querySelector('.concept-gallery').setAttribute('aria-label', isThai ? 'ภาพแนวคิดที่พักอาศัย' : 'Illustrative concept residences');
  document.querySelector('.map-lines svg').setAttribute('aria-label', isThai ? 'แผนที่จำลองบริเวณหาดจอมเทียน' : 'Stylized map around Jomtien Beach');
  document.title = isThai ? 'AROM Jomtien — สัมผัสเสน่ห์แห่งความสงบ' : 'AROM Jomtien — Sense the Soulfulness';
  document.querySelector('meta[name="description"]').content = isThai ? 'AROM Jomtien — ที่พักอาศัยริมทะเลที่ถ่ายทอดเสน่ห์แห่งความสงบ' : 'AROM Jomtien — beachfront residences shaped by the soulfulness of the sea.';
  document.querySelector('.scroll-cue').setAttribute('aria-label', isThai ? 'เลื่อนเพื่อดูเรื่องราวโครงการ' : 'Scroll to project story');
  document.querySelector('.card-one .card-info>a').setAttribute('aria-label', isThai ? 'สอบถามที่พักอาศัย 1–2 ห้องนอน' : 'Enquire about thoughtful living residences');
  document.querySelector('.card-two .card-info>a').setAttribute('aria-label', isThai ? 'สอบถามพูลวิลล่า' : 'Enquire about pool villas');
  document.querySelector('.card-three .card-info>a').setAttribute('aria-label', isThai ? 'สอบถามเพนต์เฮาส์' : 'Enquire about penthouses');
}
languageButton.addEventListener('click', () => setLanguage(document.documentElement.lang === 'en' ? 'th' : 'en'));
setLanguage(localStorage.getItem('arom_lang') === 'th' ? 'th' : 'en');

document.querySelector('#lead-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const lead = { name, email: form.elements.email.value.trim(), phone: form.elements.phone.value.trim(), initials: name.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase(), tone: 'mint', source: 'Website', unit: 'Not selected', stage: 'New inquiry', follow: 'Within 15 minutes', agent: 'Unassigned', agentInitial: '—', createdAt: new Date().toISOString() };
  const stored = JSON.parse(localStorage.getItem('aromDemoLeads') || '[]');
  stored.unshift(lead);
  localStorage.setItem('aromDemoLeads', JSON.stringify(stored.slice(0, 20)));
  document.querySelector('#form-message').innerHTML = document.documentElement.lang === 'th' ? 'บันทึกข้อมูลไว้ใน CRM แล้ว <a href="../crm/index.html#leads">เปิดระบบ CRM ฝ่ายขาย →</a>' : 'Saved locally as a new CRM lead. <a href="../crm/index.html#leads">Open Sales CRM →</a>';
  form.reset();
});
