/* ══════════════════════════════════════════════════════════
   B&S Inventory — script.js
   ══════════════════════════════════════════════════════════ */

/* ── CONFIG ──────────────────────────────────────────────── */
// ↓ Cambia este número por el tuyo (formato: código país + número, sin + ni espacios)
const WA_NUMBER = '573133249981';

/* ── NAV: SCROLL & MOBILE ────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

/* ── PAGE SWITCHING ──────────────────────────────────────── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── HEATMAP DEMO (KPI card) ─────────────────────────────── */
function getCSS(varName, fallback = '') {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || fallback;
}

function buildHeatmap() {
  const container = document.getElementById('heatmap');
  if (!container) return;

  const levels = [
    getCSS('--bg3'),
    getCSS('--bg3'),
    getCSS('--border'),
    getCSS('--warning'),
    getCSS('--danger'),
    getCSS('--success'),
    getCSS('--primary-light'),
    getCSS('--border'),
    getCSS('--bg3'),
    getCSS('--warning'),
    getCSS('--danger'),
    getCSS('--success'),
    getCSS('--primary-light')
  ];

  container.innerHTML = '';

  levels.forEach((color, i) => {
    const cell = document.createElement('div');
    cell.className = 'heat-cell';
    cell.style.background = color;
    container.appendChild(cell);
  });
}

/* ── PRODUCTS DATA ───────────────────────────────────────── */
// Agrega, modifica o elimina productos según tu inventario real.
const products = [
  {
    id: 1, brand: 'Dell', name: 'Dell Latitude 5540',
    category: 'laptop', price: 4800000, oldPrice: 5500000,
    badge: 'sale', emoji: '💻',
    shortDesc: 'Laptop empresarial i5-13ª gen, 16GB RAM, SSD 512GB.',
    fullDesc: 'La Dell Latitude 5540 está diseñada para profesionales que necesitan potencia y durabilidad. Certificada MIL-SPEC, con batería de larga duración y pantalla antireflejos FHD. Ideal para trabajo corporativo y teletrabajo exigente.',
    specs: { Procesador: 'Intel Core i5-1345U', RAM: '16 GB DDR4', Almacenamiento: 'SSD 512 GB NVMe', Pantalla: '15.6" FHD IPS', SO: 'Windows 11 Pro', Garantía: '1 año en sitio' },
  },
  {
    id: 2, brand: 'Apple', name: 'MacBook Air M3',
    category: 'laptop', price: 8900000, oldPrice: null,
    badge: 'new', emoji: '🍎',
    shortDesc: 'Chip M3, 8GB RAM unificada, SSD 256GB, pantalla Liquid Retina.',
    fullDesc: 'El MacBook Air M3 ofrece un rendimiento excepcional sin ventiladores, hasta 18 horas de batería y la pantalla Liquid Retina más brillante. Perfecto para diseñadores, desarrolladores y creativos.',
    specs: { Procesador: 'Apple M3 (8 núcleos)', RAM: '8 GB Unificada', Almacenamiento: 'SSD 256 GB', Pantalla: '13.6" Liquid Retina', SO: 'macOS Sonoma', Garantía: '1 año AppleCare' },
  },
  {
    id: 3, brand: 'Lenovo', name: 'ThinkPad X1 Carbon Gen 11',
    category: 'laptop', price: 7200000, oldPrice: 7800000,
    badge: 'hot', emoji: '⌨️',
    shortDesc: 'Ultrabook premium i7-13ª gen, 16GB RAM, pantalla WUXGA táctil.',
    fullDesc: 'El ThinkPad X1 Carbon es el estándar oro en laptops corporativas. Solo 1.12 kg, construcción en fibra de carbono, teclado ThinkPad legendario y certificación múltiple MIL-SPEC.',
    specs: { Procesador: 'Intel Core i7-1365U', RAM: '16 GB LPDDR5', Almacenamiento: 'SSD 512 GB', Pantalla: '14" WUXGA Touch IPS', SO: 'Windows 11 Pro', Garantía: '3 años on-site' },
  },
  {
    id: 4, brand: 'HP', name: 'HP EliteBook 840 G10',
    category: 'laptop', price: 5600000, oldPrice: null,
    badge: null, emoji: '🖥️',
    shortDesc: 'Laptop empresarial i7, 16GB RAM, cámara pop-up privacidad.',
    fullDesc: 'El EliteBook 840 G10 cuenta con la plataforma Intel vPro para gestión remota, cámara con obturador físico de privacidad y HP Wolf Security integrada para protección de endpoints.',
    specs: { Procesador: 'Intel Core i7-1355U', RAM: '16 GB DDR5', Almacenamiento: 'SSD 512 GB', Pantalla: '14" FHD IPS', SO: 'Windows 11 Pro', Garantía: '3 años NBD' },
  },
  {
    id: 5, brand: 'Dell', name: 'Dell OptiPlex 7010 SFF',
    category: 'desktop', price: 3200000, oldPrice: null,
    badge: null, emoji: '🖥️',
    shortDesc: 'PC compacto empresarial i5-13ª gen, 8GB RAM, SSD 256GB.',
    fullDesc: 'El OptiPlex 7010 SFF es la solución de escritorio compacta ideal para espacios reducidos. Factor de forma pequeño, bajo consumo energético y totalmente gestionable vía Dell Command.',
    specs: { Procesador: 'Intel Core i5-13500', RAM: '8 GB DDR4', Almacenamiento: 'SSD 256 GB', Puertos: '2x USB-A, 2x USB-C, HDMI', SO: 'Windows 11 Pro', Garantía: '3 años NBD' },
  },
  {
    id: 6, brand: 'HP', name: 'HP EliteDesk 800 G9',
    category: 'desktop', price: 4100000, oldPrice: 4500000,
    badge: 'sale', emoji: '🖥️',
    shortDesc: 'Torre empresarial i7-12ª gen, 16GB RAM, expansión máxima.',
    fullDesc: 'El EliteDesk 800 G9 es la torre de escritorio más versátil de HP. Admite GPU dedicada, múltiples almacenamientos y conexión a redes 10GbE. Gestión remota HP vPro incluida.',
    specs: { Procesador: 'Intel Core i7-12700', RAM: '16 GB DDR5', Almacenamiento: 'SSD 512 GB + HDD 1 TB', GPU: 'Intel UHD 770', SO: 'Windows 11 Pro', Garantía: '3 años on-site' },
  },
  {
    id: 7, brand: 'Samsung', name: 'Samsung Odyssey G5 34"',
    category: 'monitor', price: 2800000, oldPrice: 3100000,
    badge: 'sale', emoji: '🖥️',
    shortDesc: 'Monitor curvo 34" WQHD, 165Hz, 1ms, AMD FreeSync.',
    fullDesc: 'El Samsung Odyssey G5 de 34 pulgadas ofrece una experiencia inmersiva con su panel VA curvo 1000R. WQHD (3440x1440), 165Hz de actualización y 1ms de respuesta para trabajo y entretenimiento.',
    specs: { Tamaño: '34" Curvo 1000R', Resolución: '3440 x 1440 (WQHD)', Panel: 'VA', Frecuencia: '165 Hz', Respuesta: '1 ms', Conectividad: 'HDMI 2.0, DisplayPort 1.2' },
  },
  {
    id: 8, brand: 'Dell', name: 'Dell UltraSharp U2722D',
    category: 'monitor', price: 2100000, oldPrice: null,
    badge: 'new', emoji: '🖥️',
    shortDesc: 'Monitor 27" 4K USB-C, cobertura sRGB 100%, calibración de fábrica.',
    fullDesc: 'El UltraSharp U2722D es el monitor de referencia para profesionales. Cobertura sRGB 100%, Delta E < 2 de fábrica, hub USB-C 90W integrado y soporte completamente articulado.',
    specs: { Tamaño: '27" IPS', Resolución: '3840 x 2160 (4K)', Cobertura: '100% sRGB / 95% DCI-P3', Conectividad: 'USB-C 90W, HDMI, DP, USB hub', Respuesta: '5 ms', Garantía: '3 años cambio de panel' },
  },
  {
    id: 9, brand: 'Cisco', name: 'Cisco Catalyst 1000-8T',
    category: 'networking', price: 1850000, oldPrice: null,
    badge: null, emoji: '📡',
    shortDesc: 'Switch administrable 8 puertos GbE + 2 SFP uplinks.',
    fullDesc: 'El Cisco Catalyst 1000 es ideal para redes empresariales pequeñas y medianas. Administración vía web GUI o CLI, QoS avanzado, VLANs, soporte PoE y sin necesidad de licencias adicionales.',
    specs: { Puertos: '8x GbE RJ45 + 2x SFP', Velocidad: '1 Gbps por puerto', PoE: 'No (versión 8FP: PoE+)', Administración: 'Web GUI / CLI', Switching: '20 Gbps', Garantía: '1 año' },
  },
  {
    id: 10, brand: 'Cisco', name: 'Cisco RV345 Router',
    category: 'networking', price: 2400000, oldPrice: null,
    badge: null, emoji: '🌐',
    shortDesc: 'Router dual WAN, VPN IPsec, 16 puertos GbE para PYMES.',
    fullDesc: 'El Cisco RV345 es un router de grado empresarial para pequeñas y medianas empresas. Dual WAN con failover automático, hasta 100 túneles VPN IPsec simultáneos y QoS por aplicación.',
    specs: { WAN: '2x GbE (dual WAN)', LAN: '16x GbE', VPN: '100 túneles IPsec', Seguridad: 'SPI Firewall, DoS', Gestión: 'Web GUI / Cisco FindIT', Garantía: '1 año' },
  },
  {
    id: 11, brand: 'Dell', name: 'Dell PowerEdge T40',
    category: 'server', price: 6500000, oldPrice: null,
    badge: 'new', emoji: '🗄️',
    shortDesc: 'Servidor torre Xeon E-2224G, 8GB ECC RAM, expansión 4 bahías.',
    fullDesc: 'El PowerEdge T40 es el servidor de entrada ideal para pequeñas empresas. Procesador Xeon con RAM ECC para máxima fiabilidad, 4 bahías de almacenamiento y soporte iDRAC para gestión remota.',
    specs: { Procesador: 'Intel Xeon E-2224G (3.5GHz)', RAM: '8 GB DDR4 ECC', Almacenamiento: '1 TB SATA (4 bahías total)', Red: '2x 1GbE', SO: 'Windows Server / Linux', Garantía: '3 años ProSupport' },
  },
  {
    id: 12, brand: 'HP', name: 'HP ProLiant MicroServer Gen10+',
    category: 'server', price: 7900000, oldPrice: 8600000,
    badge: 'sale', emoji: '🗄️',
    shortDesc: 'Microservidor Xeon E-2224, 16GB ECC, iLO5 integrado.',
    fullDesc: 'El ProLiant MicroServer Gen10+ ofrece potencia de servidor en factor de forma compacto. Perfecto para almacenamiento NAS, virtualización ligera o como servidor de archivos/impresión.',
    specs: { Procesador: 'Intel Xeon E-2224 (3.4GHz)', RAM: '16 GB DDR4 ECC', Almacenamiento: '4 bahías LFF hot-plug', iLO: 'iLO 5 integrado', Red: '2x 1GbE', Garantía: '3 años NBD' },
  },
  {
    id: 13, brand: 'Samsung', name: 'Samsung 860 EVO 2TB',
    category: 'storage', price: 620000, oldPrice: 750000,
    badge: 'sale', emoji: '💾',
    shortDesc: 'SSD SATA 2TB, lectura 550MB/s, garantía 5 años.',
    fullDesc: 'El Samsung 860 EVO es el SSD SATA de referencia. Tecnología V-NAND de 3ª generación para máxima durabilidad y velocidades constantes hasta en cargas de trabajo intensivas.',
    specs: { Capacidad: '2 TB', Interfaz: 'SATA III 6Gb/s', Lectura: '550 MB/s', Escritura: '520 MB/s', Durabilidad: '1200 TBW', Garantía: '5 años' },
  },
  {
    id: 14, brand: 'HP', name: 'HP ProCurve 24G Switch',
    category: 'networking', price: 3200000, oldPrice: null,
    badge: null, emoji: '📡',
    shortDesc: 'Switch L2+ 24 puertos GbE PoE+, administrable, montaje en rack.',
    fullDesc: 'El HP ProCurve 24G es ideal para redes corporativas. 24 puertos PoE+ para alimentar cámaras, teléfonos IP y puntos de acceso WiFi. QoS, VLANs y stacking incluidos.',
    specs: { Puertos: '24x GbE PoE+ + 4x SFP', PoE: '370W total', Switching: '56 Gbps', Administración: 'Web GUI / SNMP', Montaje: 'Rack 1U', Garantía: 'Limitada de por vida' },
  },
  {
    id: 15, brand: 'Lenovo', name: 'Lenovo IdeaCentre AIO 3',
    category: 'desktop', price: 3800000, oldPrice: null,
    badge: 'new', emoji: '🖥️',
    shortDesc: 'All-in-One 27" FHD, Ryzen 5, 16GB RAM, diseño sin cables.',
    fullDesc: 'El IdeaCentre AIO 3 elimina el desorden de cables con su diseño todo-en-uno de 27 pulgadas. Ideal para home-office y empresas que buscan elegancia y potencia sin ocupar espacio en escritorio.',
    specs: { Procesador: 'AMD Ryzen 5 7520U', RAM: '16 GB DDR5', Almacenamiento: 'SSD 512 GB', Pantalla: '27" FHD IPS Touch', SO: 'Windows 11 Home', Garantía: '1 año carry-in' },
  },
  {
    id: 16, brand: 'Samsung', name: 'NAS Samsung T7 Shield 4TB',
    category: 'storage', price: 480000, oldPrice: null,
    badge: null, emoji: '📦',
    shortDesc: 'SSD externo portátil 4TB USB 3.2, resistente a golpes y polvo.',
    fullDesc: 'El Samsung T7 Shield ofrece velocidades USB 3.2 Gen2 hasta 1050 MB/s en un cuerpo resistente a caídas (hasta 3m), polvo y agua (IP65). Ideal para copias de seguridad y transporte de datos.',
    specs: { Capacidad: '4 TB', Interfaz: 'USB 3.2 Gen 2 (10 Gbps)', Lectura: '1050 MB/s', Resistencia: 'IP65, caídas hasta 3m', Compatibilidad: 'PC, Mac, Android', Garantía: '3 años' },
  },
];

/* ── FILTER STATE ────────────────────────────────────────── */
let priceMin = 0;
let priceMax = 30000000;

function updateRange() {
  const minEl = document.getElementById('priceMin');
  const maxEl = document.getElementById('priceMax');
  priceMin = parseInt(minEl.value);
  priceMax = parseInt(maxEl.value);

  // Keep min ≤ max
  if (priceMin > priceMax) [priceMin, priceMax] = [priceMax, priceMin];

  const fill = document.getElementById('rangeFill');
  const pct1 = (priceMin / 30000000) * 100;
  const pct2 = (priceMax / 30000000) * 100;
  fill.style.left  = pct1 + '%';
  fill.style.width = (pct2 - pct1) + '%';

  document.getElementById('labelMin').textContent = formatPrice(priceMin);
  document.getElementById('labelMax').textContent = formatPrice(priceMax);
  applyFilters();
}

/* ── HELPERS ─────────────────────────────────────────────── */
function formatPrice(n) {
  return '$' + n.toLocaleString('es-CO');
}

function getChecked(filterAttr) {
  return [...document.querySelectorAll(`input[data-filter="${filterAttr}"]:checked`)]
    .map(el => el.value);
}

/* ── FILTER & RENDER ─────────────────────────────────────── */
function applyFilters() {
  const cats   = getChecked('category');
  const brands = getChecked('brand');
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  const sort   = document.getElementById('sortSelect').value;

  let filtered = products.filter(p => {
    if (cats.length   && !cats.includes(p.category))   return false;
    if (brands.length && !brands.includes(p.brand))    return false;
    if (p.price < priceMin || p.price > priceMax)      return false;
    if (search &&
        !p.name.toLowerCase().includes(search) &&
        !p.brand.toLowerCase().includes(search) &&
        !p.shortDesc.toLowerCase().includes(search))   return false;
    return true;
  });

  if (sort === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'name')       filtered.sort((a, b) => a.name.localeCompare(b.name));

  renderProducts(filtered);
  document.getElementById('resultsCount').textContent =
    `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}`;
}

function clearFilters() {
  document.querySelectorAll('input[data-filter]').forEach(el => el.checked = false);
  document.getElementById('priceMin').value = 0;
  document.getElementById('priceMax').value = 30000000;
  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value = 'default';
  priceMin = 0;
  priceMax = 30000000;
  updateRange();
  applyFilters();
}

function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!list.length) {
    grid.innerHTML = `
      <div class="no-results">
        <span>🔍</span>
        No hay equipos con esos filtros.<br>Intenta ampliar la búsqueda.
      </div>`;
    return;
  }

  const WA_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.118 1.528 5.847L.057 23.998l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.598-.504-5.098-1.383l-.366-.217-3.74.981.997-3.645-.237-.376A9.963 9.963 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>`;

  grid.innerHTML = list.map(p => {
    const badgeLabel = p.badge === 'new' ? 'Nuevo' : p.badge === 'sale' ? 'Oferta' : 'Popular';
    return `
    <div class="product-card" onclick="openModal(${p.id})">
      <div class="product-img">
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${badgeLabel}</span>` : ''}
        <span style="font-size:4.5rem;position:relative;z-index:1">${p.emoji}</span>
      </div>
      <div class="product-body">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.shortDesc}</div>
        <div class="product-price">
          ${formatPrice(p.price)}
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
      </div>
      <div class="product-footer">
        <button class="btn-detail"
          onclick="event.stopPropagation(); openModal(${p.id})">Ver detalles</button>
        <button class="btn-wa"
          onclick="event.stopPropagation(); askWA(${p.id})"
          title="Preguntar por WhatsApp">
          ${WA_SVG} WA
        </button>
      </div>
    </div>`;
  }).join('');
}

/* ── MODAL ───────────────────────────────────────────────── */
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalImg').textContent        = p.emoji;
  document.getElementById('modalBrand').textContent      = p.brand;
  document.getElementById('modalTitle').textContent      = p.name;
  document.getElementById('modalPrice').textContent      = formatPrice(p.price);
  document.getElementById('modalOldPrice').textContent   = p.oldPrice ? formatPrice(p.oldPrice) : '';
  document.getElementById('modalDesc').textContent       = p.fullDesc;

  document.getElementById('modalSpecs').innerHTML =
    Object.entries(p.specs).map(([k, v]) => `
      <div class="spec-item">
        <div class="spec-key">${k}</div>
        <div class="spec-val">${v}</div>
      </div>`).join('');

  document.getElementById('modalWaBtn').onclick = () => askWA(id);
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  // Allow closing via overlay click or the × button
  if (e) {
    const isOverlay   = e.target === document.getElementById('productModal');
    const isCloseBtn  = e.target.classList.contains('modal-close');
    if (!isOverlay && !isCloseBtn) return;
  }
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('productModal').classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── WHATSAPP REDIRECT ───────────────────────────────────── */
function askWA(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const msg = encodeURIComponent(
    `Hola! Me interesa conocer más sobre: *${p.name}* (${formatPrice(p.price)}). ¿Está disponible?`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildHeatmap();
  updateRange();
  applyFilters();
});
