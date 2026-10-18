const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    navigation.classList.remove('open');
  });
});

document.querySelector('#lead-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const lead = {
    name,
    email: form.elements.email.value.trim(),
    phone: form.elements.phone.value.trim(),
    initials: name.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase(),
    tone: 'mint', source: 'Website', unit: 'Not selected', stage: 'New inquiry',
    follow: 'Within 15 minutes', agent: 'Unassigned', agentInitial: '—',
    createdAt: new Date().toISOString()
  };
  const stored = JSON.parse(localStorage.getItem('aromDemoLeads') || '[]');
  stored.unshift(lead);
  localStorage.setItem('aromDemoLeads', JSON.stringify(stored.slice(0, 20)));
  document.querySelector('#form-message').innerHTML = 'Saved locally as a new CRM lead. <a href="../crm/index.html#leads">Open Sales CRM →</a>';
  event.currentTarget.reset();
});
