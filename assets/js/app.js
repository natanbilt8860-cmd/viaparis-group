const menuData = [
  {
    category: "SOFTs",
    items: [
      { name: "COCA COLA ZERO / NORMAL", price: "3,50 EUR" },
      { name: "FANTA", price: "3,50 EUR" },
      { name: "AGUA NATURAL / COM GAZ", price: "3,50 EUR" },
      { name: "SCHWEPPES TONIC", price: "3,50 EUR" },
      { name: "GUARANA", price: "5,00 EUR" },
      { name: "REDBULL", price: "5,00 EUR" }
    ]
  },
  {
    category: "CERVEJAS",
    items: [
      { name: "HEINEKEN -- BALDE DE 10 ", price: "5,00 EUR -- 50,00 EUR" },
      { name: "STELLA ARTOIS -- BALDE DE 10", price: "5,00 EUR -- 50,00 EUR" },
      { name: "CORONA -- BALDE DE 10", price: "6,00 EUR -- 60,00 EUR" },
      { name: "LEFFE BLONDE / BRUNE -- BALDE DE 10", price: "6,00 EUR -- 60,00 EUR" },
      { name: "LINDEMANS -- BALDE DE 10", price: "6,00 EUR -- 60,00 EUR" },
      { name: "COZUMEL", price: "6,00 - 7,00 EUR" }
    ]
  },
    {
    category: "COMBOS + 5 SOFTs",
    items: [
      { name: "RED LABEL", price: "110,00 EUR" },
      { name: "CHIVAS", price: "140,00 EUR" },
      { name: "JACK DANIELS", price: "140,00 EUR" },
      { name: "JACK DANIELS HONEY / APPLE", price: "150,00 EUR" },
      { name: "ERISTOFF RED / PINK / PASSION", price: "110,00 EUR" },
      { name: "ABSOLUT", price: "130,00 EUR" },
      { name: "SMIRNOFF", price: "130,00 EUR" },
      { name: "BELVEDERE", price: "150,00 EUR" },
      { name: "SAFARI", price: "110,00 EUR" },
      { name: "BACARDI", price: "110,00 EUR" },
      { name: "BACARDI ORO", price: "130,00 EUR" },
      { name: "BOMBAY SAFFIRRE", price: "120,00 EUR" }
      
    ]
  },
  {
    category: "DOSES",
    items: [
      { name: "RED LABEL", price: "9,00 EUR " },
      { name: "CHIVAS", price: "10,00 EUR" },
      { name: "JACK DANIELS", price: "10,00 EUR" },
      { name: "ERISTOFF RED / PINK / PASSION", price: "9,00 EUR" },
      { name: "ABSOLUT", price: "9,00 EUR" },
      { name: "SMIRNOFF", price: "9,00 EUR" },
      { name: "SAFARI + SOFT", price: "10,00 EUR" },
      { name: "BACARDI + SOFT", price: "12,00 EUR" },
      { name: "BACARDI ORO + SOFT", price: "12,00 EUR" },
      { name: "BOMBAY SAFFIRRE + SOFT", price: "14,00 EUR" }
    ]
  },
  {
    category: "OUTROS",
    items: [
      { name: "CHAMPAGNE", price: "100,00 EUR" },
      { name: "SHOT ( TEQUILA / 51 )", price: "5,00 EUR" },
      { name: "CAIPIRINHA / PINA COLADA", price: "10,00 EUR" },
      { name: "TAÇA DE VINHO TINTO / BANCO / ROSÉ", price: "5,00 EUR" },
      { name: "CARRAFA DE VINHO TINTO / BANCO / ROSÉ", price: "35,00 EUR" }
    ]
  }
];

const STORAGE_KEY = "via-paris-dashboard-data";
const LANGUAGE_STORAGE_KEY = "via-paris-language";
const SUPABASE_TABLE = "app_state";
const SUPABASE_ROW_ID = "global";
const PENDING_SYNC_KEY = "via-paris-pending-sync";
const SUPABASE_RETRY_DELAY_MS = 3000;
const HERO_PORTFOLIO_IMAGES = [
  "assets/images/portfolio/Capture d'écran 2026-04-25 185047_Nero_AI_Image_Upscaler_Photo_Face.png",
  "assets/images/portfolio/Capture d'écran 2026-04-25 190023_Nero_AI_Image_Upscaler_Photo_Face.png",
  "assets/images/portfolio/Capture d'écran 2026-04-25 190139_Nero_AI_Image_Upscaler_Photo_Face.png",
  "assets/images/portfolio/upscalemedia-transformed_Nero_AI_Image_Upscaler_Photo_Face.png"
].map((path) => encodeURI(path));
const HERO_DEFAULT_MEDIA = HERO_PORTFOLIO_IMAGES[0] || "assets/images/video-home.mp4";
const HERO_FALLBACK_IMAGE = "assets/images/foto-2.png";
let currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || "pt-BR";
const supabaseConfig = window.VIA_PARIS_SUPABASE || {};
const supabaseClient = createSupabaseClient();

const translations = {
  "pt-BR": {
    meta: {
      title: "Via Paris Music Bar",
      description: "Via Paris Music Bar - menu, galeria de fotos e reservas."
    },
    gate: {
      title: "Escolha seu idioma",
      subtitle: "Selecione uma opcao para entrar no site"
    },
    nav: {
      home: "Inicio",
      about: "Sobre",
      photos: "Fotos",
      upcoming: "Proximos",
      reserve: "Reserva"
    },
    hero: {
      lead: "A noite começa aqui. Drinks, música e uma energia que não para.",
      cta: "Ver eventos e reservar",
      ctaStrong: "Reserva a tua mesa - e gratuito",
      ctaSecondary: "Ver proximos eventos"
    },
    contact: {
      addressLabel: "Morada:",
      addressValue: "Chaussée d'Alsemberg 5, Bruxelles",
      hoursLabel: "Horario:",
      hoursValue: "Quinta a Domingo - 22h as 5h",
      phoneLabel: "Telefone:"
    },
    about: {
      kicker: "Sobre",
      title: "O que e o Via Paris",
      intro: "O Via Paris e um music bar em Bruxelles com noites latinas, urban e afro, ambiente premium e energia de pista cheia ate de madrugada.",
      card1Title: "Atmosfera",
      card1Text: "Casa focada em experiencia completa: som forte, luz envolvente e atendimento rapido.",
      card2Title: "Musica",
      card2Text: "Programacao com ritmos latinos, funk, afrobeat e DJs convidados em festas especiais.",
      card3Title: "Publico",
      card3Text: "Perfeito para aniversarios, grupos e quem quer viver a noite de Bruxelles com estilo."
    },
    upcoming: {
      kicker: "Agenda",
      title: "Proximos eventos em destaque",
      intro: "Atualizamos esta lista com as proximas noites para facilitar a pesquisa no Google e ajudar novos clientes a conhecer o Via Paris.",
      empty: "Novos eventos serao anunciados em breve."
    },
    partners: {
      kicker: "Parcerias",
      title: "Quem construi a noite conosco",
      intro: "Lisa, Pablo e Nexvo apoiam o Via Paris em conteudo, divulgacao e ativacoes que fortalecem cada evento."
    },
    gallery: {
      kicker: "Galeria",
      title: "Fotos do Via Paris",
      intro: "Clique nas fotos para visualizar maior."
    },
    events: {
      kicker: "Eventos",
      title: "Reservar Mesa por Evento",
      intro: "Clique no flyer da festa para ver os detalhes, valor de entrada e reservar sua mesa gratuitamente.",
      whatsapp: "Duvidas no WhatsApp",
      noEvents: "Nenhum evento cadastrado no momento."
    },
    modal: {
      formTitle: "Reserva de mesa gratuita",
      name: "Seu nome",
      phone: "WhatsApp/Telefone",
      guests: "Numero de pessoas",
      note: "Observacoes (opcional)",
      confirm: "Confirmar reserva",
      entryLabel: "Entrada",
      noTables: "Sem mesas cadastradas",
      availableLabel: "disponivel",
      selectTable: "Selecione uma mesa disponivel.",
      soldOut: "Essa mesa acabou. Escolha outro tipo.",
      success: "Reserva confirmada com sucesso. Mesa gratuita garantida!"
    },
    footer: {
      copy: "Via Paris Music Bar - Todos os direitos reservados"
    }
  },
  fr: {
    meta: {
      title: "Via Paris Music Bar",
      description: "Via Paris Music Bar - menu, galerie photo et reservations."
    },
    gate: {
      title: "Choisissez votre langue",
      subtitle: "Selectionnez une option pour entrer sur le site"
    },
    nav: {
      home: "Accueil",
      about: "A propos",
      photos: "Photos",
      upcoming: "A venir",
      reserve: "Reservation"
    },
    hero: {
      lead: "La nuit commence ici. Cocktails, musique et une energie qui ne s arrete jamais.",
      cta: "Voir les evenements et reserver",
      ctaStrong: "Reserve ta table - c est gratuit",
      ctaSecondary: "Voir les prochains evenements"
    },
    contact: {
      addressLabel: "Adresse:",
      addressValue: "Chaussée d'Alsemberg 5, Bruxelles",
      hoursLabel: "Horaires:",
      hoursValue: "Jeudi a Dimanche - 22h a 5h",
      phoneLabel: "Telephone:"
    },
    about: {
      kicker: "A propos",
      title: "Qu est-ce que Via Paris",
      intro: "Via Paris est un music bar a Bruxelles, connu pour ses nuits latines, urban et afro dans une ambiance premium.",
      card1Title: "Atmosphere",
      card1Text: "Une experience complete: son puissant, lumiere immersive et service rapide.",
      card2Title: "Musique",
      card2Text: "Programmation avec rythmes latins, funk, afrobeat et DJs invites selon les soirees.",
      card3Title: "Public",
      card3Text: "Ideal pour anniversaires, groupes et sorties nocturnes a Bruxelles."
    },
    upcoming: {
      kicker: "Agenda",
      title: "Prochains evenements en vedette",
      intro: "Nous mettons cette liste a jour pour aider les nouveaux visiteurs a trouver les prochaines soirees Via Paris.",
      empty: "De nouveaux evenements seront annonces bientot."
    },
    partners: {
      kicker: "Partenariats",
      title: "Ceux qui construisent la nuit avec nous",
      intro: "Lisa, Pablo et Nexvo soutiennent Via Paris en contenu, diffusion et activations sur evenement."
    },
    gallery: {
      kicker: "Galerie",
      title: "Photos du Via Paris",
      intro: "Cliquez sur les photos pour les voir en grand."
    },
    events: {
      kicker: "Evenements",
      title: "Reserver une table par evenement",
      intro: "Cliquez sur l affiche pour voir les details, le prix d entree et reserver votre table gratuitement.",
      whatsapp: "Questions sur WhatsApp",
      noEvents: "Aucun evenement enregistre pour le moment."
    },
    modal: {
      formTitle: "Reservation de table gratuite",
      name: "Votre nom",
      phone: "WhatsApp/Telephone",
      guests: "Nombre de personnes",
      note: "Remarques (optionnel)",
      confirm: "Confirmer la reservation",
      entryLabel: "Entree",
      noTables: "Aucune table enregistree",
      availableLabel: "disponible",
      selectTable: "Selectionnez une table disponible.",
      soldOut: "Cette table n est plus disponible. Choisissez un autre type.",
      success: "Reservation confirmee avec succes. Table gratuite garantie !"
    },
    footer: {
      copy: "Via Paris Music Bar - Tous droits reserves"
    }
  },
  en: {
    meta: {
      title: "Via Paris Music Bar",
      description: "Via Paris Music Bar - menu, photo gallery and reservations."
    },
    gate: {
      title: "Choose your language",
      subtitle: "Select one option to enter the site"
    },
    nav: {
      home: "Home",
      about: "About",
      photos: "Photos",
      upcoming: "Upcoming",
      reserve: "Reservation"
    },
    hero: {
      lead: "The night starts here. Drinks, music and nonstop energy.",
      cta: "See events and reserve",
      ctaStrong: "Reserve your table - it is free",
      ctaSecondary: "See upcoming events"
    },
    contact: {
      addressLabel: "Address:",
      addressValue: "Chaussée d'Alsemberg 5, Bruxelles",
      hoursLabel: "Opening hours:",
      hoursValue: "Thursday to Sunday - 10 PM to 5 AM",
      phoneLabel: "Phone:"
    },
    about: {
      kicker: "About",
      title: "What Via Paris is",
      intro: "Via Paris is a Brussels music bar known for latin, urban and afro nights in a premium party atmosphere.",
      card1Title: "Atmosphere",
      card1Text: "A complete night-out setup: strong sound, immersive lights and fast service.",
      card2Title: "Music",
      card2Text: "Line-up with latin rhythms, funk, afrobeat and invited DJs on special nights.",
      card3Title: "Crowd",
      card3Text: "Perfect for birthdays, groups and anyone who wants a stylish Brussels nightlife experience."
    },
    upcoming: {
      kicker: "Agenda",
      title: "Upcoming highlighted events",
      intro: "We update this list to help new visitors and improve how search engines understand upcoming Via Paris nights.",
      empty: "New events will be announced soon."
    },
    partners: {
      kicker: "Partners",
      title: "Who builds the night with us",
      intro: "Lisa, Pablo and Nexvo support Via Paris with content, promotion and event activations."
    },
    gallery: {
      kicker: "Gallery",
      title: "Via Paris Photos",
      intro: "Click the photos to view them larger."
    },
    events: {
      kicker: "Events",
      title: "Reserve a Table by Event",
      intro: "Click the event flyer to see the details, entry price and reserve your table for free.",
      whatsapp: "Questions on WhatsApp",
      noEvents: "No events available right now."
    },
    modal: {
      formTitle: "Free table reservation",
      name: "Your name",
      phone: "WhatsApp/Phone",
      guests: "Number of guests",
      note: "Notes (optional)",
      confirm: "Confirm reservation",
      entryLabel: "Entry",
      noTables: "No tables registered",
      availableLabel: "available",
      selectTable: "Select an available table.",
      soldOut: "That table is sold out. Choose another type.",
      success: "Reservation confirmed successfully. Free table secured!"
    },
    footer: {
      copy: "Via Paris Music Bar - All rights reserved"
    }
  }
};

function getTranslation(key) {
  const dict = translations[currentLanguage] || translations["pt-BR"];
  return key.split(".").reduce((value, segment) => (value ? value[segment] : undefined), dict);
}

function translate(key, fallback = "") {
  const value = getTranslation(key);
  return typeof value === "string" ? value : fallback;
}

function applySiteLanguage(lang) {
  currentLanguage = translations[lang] ? lang : "pt-BR";
  document.documentElement.lang = currentLanguage;

  const title = translate("meta.title", "Via Paris Music Bar");
  const description = translate("meta.description", "Via Paris Music Bar - menu, galeria de fotos e reservas.");
  document.title = title;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    node.textContent = translate(key, node.textContent || "");
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    if (!key || !(node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement)) return;
    node.placeholder = translate(key, node.placeholder);
  });

  renderEvents();

  if (selectedEventId) {
    const eventItem = state.events.find((item) => item.id === selectedEventId);
    const price = document.getElementById("event-modal-price");
    if (eventItem && price) {
      price.textContent = `${translate("modal.entryLabel", "Entrada")}: ${eventItem.entryPrice}`;
    }
    renderTableOptions(selectedEventId);
  }
}

window.applySiteLanguage = applySiteLanguage;

function isVideoSource(src) {
  return typeof src === "string" && (src.startsWith("data:video/") || /\.(mp4|webm|ogg)(\?|#|$)/i.test(src));
}

const defaultState = {
  adminPin: "1234",
  home: {
    heroMedia: HERO_DEFAULT_MEDIA,
    heroImage: HERO_FALLBACK_IMAGE,
    gallery: [
      { src: "assets/images/foto-2.png", alt: "Foto Via Paris 2" },
      { src: "assets/images/foto-3.png", alt: "Foto Via Paris 3" },
      { src: "assets/images/foto-4.png", alt: "Foto Via Paris 4" }
    ]
  },
  tableTypes: [
    { id: "mesa-vip", name: "Mesa VIP", quantity: 6, notes: "Ate 6 pessoas" },
    { id: "mesa-lounge", name: "Mesa Lounge", quantity: 10, notes: "Area central" }
  ],
  events: [
    {
      id: "evento-sexta-neon",
      title: "Neon Friday",
      date: "Sexta - 23:00",
      flyer: "assets/images/foto-2.png",
      entryPrice: "15 EUR",
      details: "DJ set internacional, open dancefloor e ambiente premium."
    },
    {
      id: "evento-sabado-urbano",
      title: "Urban Saturday",
      date: "Sabado - 22:30",
      flyer: "assets/images/foto-3.png",
      entryPrice: "20 EUR",
      details: "Noite urbana com convidados especiais e show ao vivo."
    }
  ],
  eventTableTypes: {
    "evento-sexta-neon": [
      { id: "mesa-vip-neon", name: "Mesa VIP", quantity: 6, notes: "Ate 6 pessoas" },
      { id: "mesa-lounge-neon", name: "Mesa Lounge", quantity: 10, notes: "Area central" }
    ],
    "evento-sabado-urbano": [
      { id: "mesa-vip-urbano", name: "Mesa VIP", quantity: 6, notes: "Ate 6 pessoas" },
      { id: "mesa-lounge-urbano", name: "Mesa Lounge", quantity: 10, notes: "Area central" }
    ]
  },
  reservations: []
};

let state = deepCopy(defaultState);
let selectedEventId = null;
let pendingEventFlyer = "";
let pendingHeroMedia = "";
let pendingGalleryImages = [];
let syncRetryTimer = null;
let syncInFlight = false;
let heroSlideshowTimer = null;

function createSupabaseClient() {
  if (!window.supabase || !supabaseConfig.url || !supabaseConfig.anonKey) {
    return null;
  }

  if (!/\.supabase\.co$/i.test(String(supabaseConfig.url).replace(/\/$/, ""))) {
    console.warn("[Via Paris] Supabase URL invalida. Use a Project URL no formato https://<project-ref>.supabase.co");
    return null;
  }

  try {
    return window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey);
  } catch (error) {
    console.warn("[Via Paris] Falha ao iniciar cliente Supabase:", error);
    return null;
  }
}

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeState(parsed) {
  return {
    ...deepCopy(defaultState),
    ...parsed,
    home: {
      ...deepCopy(defaultState.home),
      ...(parsed.home || {})
    },
    events: Array.isArray(parsed.events) ? parsed.events : deepCopy(defaultState.events),
    tableTypes: Array.isArray(parsed.tableTypes) ? parsed.tableTypes : deepCopy(defaultState.tableTypes),
    eventTableTypes:
      parsed.eventTableTypes && typeof parsed.eventTableTypes === "object"
        ? parsed.eventTableTypes
        : deepCopy(defaultState.eventTableTypes),
    reservations: Array.isArray(parsed.reservations) ? parsed.reservations : []
  };
}

function loadLocalState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return deepCopy(defaultState);

    const parsed = JSON.parse(saved);
    return mergeState(parsed);
  } catch (_error) {
    return deepCopy(defaultState);
  }
}

async function loadState() {
  const localState = loadLocalState();
  if (!supabaseClient) return localState;

  try {
    const { data, error } = await supabaseClient
      .from(SUPABASE_TABLE)
      .select("state_json")
      .eq("id", SUPABASE_ROW_ID)
      .maybeSingle();

    if (error) {
      console.warn("[Via Paris] Falha ao ler estado do Supabase:", error.message || error);
      return localState;
    }

    if (data && data.state_json && typeof data.state_json === "object") {
      const mergedCloud = mergeState(data.state_json);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedCloud));
      return mergedCloud;
    }

    await supabaseClient
      .from(SUPABASE_TABLE)
      .upsert({ id: SUPABASE_ROW_ID, state_json: localState }, { onConflict: "id" });

    return localState;
  } catch (error) {
    console.warn("[Via Paris] Erro inesperado ao carregar estado do Supabase:", error);
    return localState;
  }
}

function normalizeState() {
  if (!state.home.heroMedia || state.home.heroMedia === "assets/images/foto-1.jpg") {
    state.home.heroMedia = HERO_DEFAULT_MEDIA;
  }

  if (state.home.heroImage === "assets/images/video-home.mp4") {
    state.home.heroImage = HERO_FALLBACK_IMAGE;
  }

  if (!state.home.heroMedia) {
    state.home.heroMedia = state.home.heroImage || defaultState.home.heroMedia;
  }

  if (!state.home.heroImage || state.home.heroImage === "assets/images/foto-1.jpg") {
    state.home.heroImage = HERO_FALLBACK_IMAGE;
  }

  if (Array.isArray(state.home.gallery)) {
    state.home.gallery = state.home.gallery.filter((image) => image && image.src !== "assets/images/foto-1.jpg");
  }

  if (!state.home.gallery.length) {
    state.home.gallery = deepCopy(defaultState.home.gallery);
  }

  if (!state.eventTableTypes || typeof state.eventTableTypes !== "object") {
    state.eventTableTypes = {};
  }

  const legacyTables = Array.isArray(state.tableTypes) ? state.tableTypes : [];
  const validEventIds = new Set(state.events.map((eventItem) => eventItem.id));

  // Migrate old global table settings to per-event tables.
  state.events.forEach((eventItem) => {
    const currentTables = state.eventTableTypes[eventItem.id];
    if (!Array.isArray(currentTables) || !currentTables.length) {
      state.eventTableTypes[eventItem.id] = legacyTables.length
        ? legacyTables.map((tableType) => ({ ...tableType }))
        : deepCopy(defaultState.tableTypes).map((tableType) => ({ ...tableType, id: makeId("mesa") }));
    }
  });

  Object.keys(state.eventTableTypes).forEach((eventId) => {
    if (!validEventIds.has(eventId)) {
      delete state.eventTableTypes[eventId];
    }
  });
}

function getEventTableTypes(eventId) {
  if (!eventId || !state.eventTableTypes || typeof state.eventTableTypes !== "object") {
    return [];
  }

  const eventTables = state.eventTableTypes[eventId];
  return Array.isArray(eventTables) ? eventTables : [];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  markPendingSync();
  void flushStateToCloud();
}

function hasPendingSync() {
  return localStorage.getItem(PENDING_SYNC_KEY) === "1";
}

function markPendingSync() {
  localStorage.setItem(PENDING_SYNC_KEY, "1");
}

function clearPendingSync() {
  localStorage.removeItem(PENDING_SYNC_KEY);
}

function scheduleSyncRetry() {
  if (!supabaseClient || syncRetryTimer) return;

  syncRetryTimer = window.setTimeout(() => {
    syncRetryTimer = null;
    void flushStateToCloud();
  }, SUPABASE_RETRY_DELAY_MS);
}

async function flushStateToCloud() {
  if (!supabaseClient) return false;
  if (!hasPendingSync()) return true;
  if (syncInFlight) return false;

  syncInFlight = true;

  try {
    const { error } = await supabaseClient
      .from(SUPABASE_TABLE)
      .upsert(
        {
          id: SUPABASE_ROW_ID,
          state_json: state,
          updated_at: new Date().toISOString()
        },
        { onConflict: "id" }
      );

    if (error) {
      console.warn("[Via Paris] Falha ao salvar no Supabase:", error.message || error);
      scheduleSyncRetry();
      return false;
    }

    clearPendingSync();
    return true;
  } catch (error) {
    console.warn("[Via Paris] Erro inesperado ao salvar no Supabase:", error);
    scheduleSyncRetry();
    return false;
  } finally {
    syncInFlight = false;
  }
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

async function notifyReservationTeam(reservationData) {
  try {
    const response = await fetch("/api/notify-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reservationData)
    });

    if (!response.ok) {
      const details = await response.text();
      console.warn("[Via Paris] Falha ao notificar reserva:", details || response.statusText);
    }
  } catch (error) {
    console.warn("[Via Paris] Erro ao enviar notificacao da reserva:", error);
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Falha ao ler arquivo."));
    reader.readAsDataURL(file);
  });
}

function setPreviewImage(previewId, src) {
  const preview = document.getElementById(previewId);
  if (!(preview instanceof HTMLImageElement)) return;

  if (!src) {
    preview.hidden = true;
    preview.src = "";
    return;
  }

  preview.src = src;
  preview.hidden = false;
}

function setGalleryPreview(images) {
  const wrapper = document.getElementById("gallery-preview");
  if (!(wrapper instanceof HTMLElement)) return;

  wrapper.innerHTML = images
    .map((src, index) => `<img src="${src}" alt="Preview galeria ${index + 1}" />`)
    .join("");
}

function setupDropzone(dropzoneId, inputId, onFilesSelected) {
  const dropzone = document.getElementById(dropzoneId);
  const input = document.getElementById(inputId);
  if (!(dropzone instanceof HTMLElement) || !(input instanceof HTMLInputElement)) return;

  const openPicker = () => input.click();

  dropzone.addEventListener("click", openPicker);
  dropzone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  });

  input.addEventListener("change", async () => {
    const files = Array.from(input.files || []);
    if (!files.length) return;
    await onFilesSelected(files);
  });

  ["dragenter", "dragover"].forEach((type) => {
    dropzone.addEventListener(type, (event) => {
      event.preventDefault();
      dropzone.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((type) => {
    dropzone.addEventListener(type, (event) => {
      event.preventDefault();
      dropzone.classList.remove("drag-over");
    });
  });

  dropzone.addEventListener("drop", async (event) => {
    const transfer = event.dataTransfer;
    const files = Array.from(transfer ? transfer.files : []);
    if (!files.length) return;
    await onFilesSelected(files);
  });
}

function renderMenu() {
  const wrapper = document.getElementById("menu-grid");
  if (!wrapper) return;

  wrapper.innerHTML = menuData
    .map(
      (section) => `
        <article class="menu-card">
          <h3>${section.category}</h3>
          ${section.items
            .map(
              (item) => `
                <div class="menu-item">
                  <strong>${item.name}</strong>
                  <span>${item.price}</span>
                </div>
              `
            )
            .join("")}
        </article>
      `
    )
    .join("");
}

function renderGallery() {
  const wrapper = document.getElementById("gallery-grid");
  if (!wrapper) return;

  wrapper.innerHTML = state.home.gallery
    .map((image) => `<img src="${image.src}" alt="${image.alt}" data-full="${image.src}" />`)
    .join("");
}

function applyHomeImages() {
  const heroVideo = document.getElementById("hero-video");
  const heroImage = document.getElementById("hero-image");
  const slideshowSources = HERO_PORTFOLIO_IMAGES.length ? HERO_PORTFOLIO_IMAGES : [HERO_FALLBACK_IMAGE];

  if (heroSlideshowTimer) {
    window.clearInterval(heroSlideshowTimer);
    heroSlideshowTimer = null;
  }

  if (heroImage instanceof HTMLImageElement) {
    let index = 0;
    heroImage.hidden = false;
    heroImage.src = slideshowSources[index];
    heroImage.alt = "Via Paris portfolio";

    if (slideshowSources.length > 1) {
      heroSlideshowTimer = window.setInterval(() => {
        index = (index + 1) % slideshowSources.length;
        heroImage.src = slideshowSources[index];
      }, 3500);
    }
  }

  if (heroVideo instanceof HTMLVideoElement) {
    heroVideo.hidden = true;
    heroVideo.pause();
    heroVideo.removeAttribute("src");
    heroVideo.load();
  }
}

function setHeroPreview(src) {
  const imagePreview = document.getElementById("hero-photo-preview");
  const videoPreview = document.getElementById("hero-video-preview");
  const isVideo = typeof src === "string" && (src.startsWith("data:video/") || /\.(mp4|webm|ogg)(\?|#|$)/i.test(src));

  if (imagePreview instanceof HTMLImageElement) {
    imagePreview.hidden = isVideo || !src;
    imagePreview.src = !isVideo && src ? src : "";
  }

  if (videoPreview instanceof HTMLVideoElement) {
    videoPreview.hidden = !isVideo;
    if (isVideo) {
      videoPreview.src = src;
      videoPreview.play().catch(() => {});
    } else {
      videoPreview.pause();
      videoPreview.removeAttribute("src");
      videoPreview.load();
    }
  }
}

function getReservedCount(eventId, tableTypeId) {
  return state.reservations.filter((item) => item.eventId === eventId && item.tableTypeId === tableTypeId).length;
}

function renderEvents() {
  const wrapper = document.getElementById("events-grid");
  if (!wrapper) return;

  if (!state.events.length) {
    wrapper.innerHTML = `<p class="section-intro">${translate("events.noEvents", "Nenhum evento cadastrado no momento.")}</p>`;
    renderUpcomingEventsText();
    return;
  }

  wrapper.innerHTML = state.events
    .map(
      (eventItem) => `
        <button class="event-card" type="button" data-event-id="${eventItem.id}">
          <img src="${eventItem.flyer}" alt="Flyer ${eventItem.title}" />
          <div class="event-card-body">
            <h3>${eventItem.title}</h3>
            <p>${eventItem.date}</p>
          </div>
        </button>
      `
    )
    .join("");

  renderUpcomingEventsText();
}

function renderUpcomingEventsText() {
  const list = document.getElementById("upcoming-events-list");
  if (!(list instanceof HTMLElement)) return;

  if (!state.events.length) {
    list.innerHTML = `<li>${translate("upcoming.empty", "Novos eventos serao anunciados em breve.")}</li>`;
    return;
  }

  list.innerHTML = state.events
    .slice(0, 6)
    .map(
      (eventItem) => `
        <li>
          <strong>${eventItem.title}</strong>
          <span>${eventItem.date}</span>
          <p>${eventItem.details}</p>
        </li>
      `
    )
    .join("");
}

function renderTableOptions(eventId) {
  const select = document.getElementById("reserve-table");
  if (!(select instanceof HTMLSelectElement)) return;

  const eventTables = getEventTableTypes(eventId);

  if (!eventTables.length) {
    select.innerHTML = `<option value="">${translate("modal.noTables", "Sem mesas cadastradas")}</option>`;
    return;
  }

  select.innerHTML = eventTables
    .map((tableType) => {
      const reserved = getReservedCount(eventId, tableType.id);
      const left = Math.max(tableType.quantity - reserved, 0);
      const label = `${tableType.name} (${left} ${translate("modal.availableLabel", "disponivel")})`;
      return `<option value="${tableType.id}" ${left === 0 ? "disabled" : ""}>${label}</option>`;
    })
    .join("");
}

function openEventModal(eventId) {
  const eventItem = state.events.find((item) => item.id === eventId);
  const modal = document.getElementById("event-modal");
  const flyer = document.getElementById("event-modal-flyer");
  const title = document.getElementById("event-modal-title");
  const date = document.getElementById("event-modal-date");
  const details = document.getElementById("event-modal-details");
  const price = document.getElementById("event-modal-price");
  const feedback = document.getElementById("reservation-feedback");
  const form = document.getElementById("reservation-form");

  if (!eventItem || !(modal instanceof HTMLElement)) return;

  if (flyer instanceof HTMLImageElement) flyer.src = eventItem.flyer;
  if (title) title.textContent = eventItem.title;
  if (date) date.textContent = eventItem.date;
  if (details) details.textContent = eventItem.details;
  if (price) price.textContent = `${translate("modal.entryLabel", "Entrada")}: ${eventItem.entryPrice}`;
  if (feedback) feedback.textContent = "";
  if (form instanceof HTMLFormElement) form.reset();

  selectedEventId = eventId;
  renderTableOptions(eventId);

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeEventModal() {
  const modal = document.getElementById("event-modal");
  if (!(modal instanceof HTMLElement)) return;

  modal.hidden = true;
  selectedEventId = null;
  document.body.style.overflow = "";
}

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupLightbox() {
  const box = document.getElementById("lightbox");
  const close = document.getElementById("lightbox-close");
  const boxImage = document.getElementById("lightbox-image");
  const gallery = document.getElementById("gallery-grid");

  if (!box || !close || !boxImage || !gallery) return;

  const closeBox = () => {
    box.hidden = true;
    boxImage.src = "";
    document.body.style.overflow = "";
  };

  gallery.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const image = target.closest("img[data-full]");
    if (!(image instanceof HTMLImageElement)) return;

    const full = image.getAttribute("data-full");
    if (!full) return;

    boxImage.src = full;
    box.hidden = false;
    document.body.style.overflow = "hidden";
  });

  // If an image path is broken, do not leave the overlay stuck on screen.
  boxImage.addEventListener("error", closeBox);

  // Prevent clicks on the image itself from triggering backdrop close logic.
  boxImage.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  close.addEventListener("click", closeBox);
  close.addEventListener("touchstart", closeBox, { passive: true });

  box.addEventListener("click", (event) => {
    if (event.target === box) {
      closeBox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !box.hidden) closeBox();
  });
}

function setupEvents() {
  const eventsGrid = document.getElementById("events-grid");
  const modal = document.getElementById("event-modal");
  const close = document.getElementById("event-modal-close");
  const reserveForm = document.getElementById("reservation-form");
  const feedback = document.getElementById("reservation-feedback");

  if (!(eventsGrid instanceof HTMLElement)) return;

  eventsGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const card = target.closest(".event-card");
    if (!(card instanceof HTMLElement)) return;

    const eventId = card.getAttribute("data-event-id");
    if (!eventId) return;
    openEventModal(eventId);
  });

  if (close instanceof HTMLButtonElement) {
    close.addEventListener("click", closeEventModal);
  }

  if (modal instanceof HTMLElement) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeEventModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeEventModal();
    }
  });

  if (reserveForm instanceof HTMLFormElement) {
    reserveForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!selectedEventId) return;

      const name = document.getElementById("reserve-name");
      const phone = document.getElementById("reserve-phone");
      const guests = document.getElementById("reserve-guests");
      const table = document.getElementById("reserve-table");
      const note = document.getElementById("reserve-note");

      if (
        !(name instanceof HTMLInputElement) ||
        !(phone instanceof HTMLInputElement) ||
        !(guests instanceof HTMLInputElement) ||
        !(table instanceof HTMLSelectElement) ||
        !(note instanceof HTMLTextAreaElement)
      ) {
        return;
      }

      const eventTables = getEventTableTypes(selectedEventId);
      const tableType = eventTables.find((item) => item.id === table.value);
      if (!tableType) {
        if (feedback) feedback.textContent = translate("modal.selectTable", "Selecione uma mesa disponivel.");
        return;
      }

      const reserved = getReservedCount(selectedEventId, tableType.id);
      if (reserved >= tableType.quantity) {
        if (feedback) feedback.textContent = translate("modal.soldOut", "Essa mesa acabou. Escolha outro tipo.");
        renderTableOptions(selectedEventId);
        return;
      }

      state.reservations.push({
        id: makeId("reserva"),
        eventId: selectedEventId,
        tableTypeId: tableType.id,
        name: name.value.trim(),
        phone: phone.value.trim(),
        guests: Number(guests.value) || 1,
        note: note.value.trim(),
        createdAt: new Date().toISOString()
      });

      const savedReservation = state.reservations[state.reservations.length - 1];

      saveState();
      renderTableOptions(selectedEventId);
      renderAdminLists();

      void notifyReservationTeam({
        reservationId: savedReservation.id,
        eventId: selectedEventId,
        eventTitle: state.events.find((item) => item.id === selectedEventId)?.title || "Evento",
        eventDate: state.events.find((item) => item.id === selectedEventId)?.date || "",
        tableTypeId: tableType.id,
        tableName: tableType.name,
        name: savedReservation.name,
        phone: savedReservation.phone,
        guests: savedReservation.guests,
        note: savedReservation.note,
        createdAt: savedReservation.createdAt
      });

      reserveForm.reset();
      if (feedback) feedback.textContent = translate("modal.success", "Reserva confirmada com sucesso. Mesa gratuita garantida!");
    });
  }
}

function renderAdminLists() {
  const eventList = document.getElementById("admin-events-list");
  const tableList = document.getElementById("admin-tables-list");
  const tableEventSelect = document.getElementById("table-event-id");
  if (!(eventList instanceof HTMLElement) || !(tableList instanceof HTMLElement)) return;

  if (tableEventSelect instanceof HTMLSelectElement) {
    tableEventSelect.innerHTML = state.events
      .map((eventItem) => `<option value="${eventItem.id}">${eventItem.title}</option>`)
      .join("");
  }

  eventList.innerHTML = state.events
    .map(
      (eventItem) => `
        <div class="admin-item">
          <div>
            <strong>${eventItem.title}</strong>
            <p>${eventItem.date} · Entrada ${eventItem.entryPrice}</p>
          </div>
          <div class="admin-item-actions">
            <button type="button" data-edit-event="${eventItem.id}">Editar</button>
            <button type="button" data-delete-event="${eventItem.id}">Remover</button>
          </div>
        </div>
      `
    )
    .join("");

  tableList.innerHTML = state.events
    .map((eventItem) => {
      const eventTables = getEventTableTypes(eventItem.id);
      if (!eventTables.length) {
        return `
          <div class="admin-item">
            <div>
              <strong>${eventItem.title}</strong>
              <p>Sem mesas cadastradas para este evento</p>
            </div>
          </div>
        `;
      }

      return eventTables
        .map((tableType) => {
          const reservations = state.reservations.filter(
            (item) => item.eventId === eventItem.id && item.tableTypeId === tableType.id
          ).length;
          return `
            <div class="admin-item">
              <div>
                <strong>${tableType.name}</strong>
                <p>${eventItem.title} · ${tableType.quantity} mesas · ${reservations} reservas</p>
              </div>
              <div class="admin-item-actions">
                <button type="button" data-edit-table="${tableType.id}" data-event-id="${eventItem.id}">Editar</button>
                <button type="button" data-delete-table="${tableType.id}" data-event-id="${eventItem.id}">Remover</button>
              </div>
            </div>
          `;
        })
        .join("");
    })
    .join("");
}

function setupAdmin() {
  const loginWrap = document.getElementById("admin-login");
  const panel = document.getElementById("admin-panel");
  const openBtn = document.getElementById("admin-open");
  const closeBtn = document.getElementById("admin-close");
  const pin = document.getElementById("admin-pin");
  const eventForm = document.getElementById("event-form");
  const tableForm = document.getElementById("table-form");
  const homeForm = document.getElementById("home-form");
  const eventList = document.getElementById("admin-events-list");
  const tableList = document.getElementById("admin-tables-list");
  const eventFlyerFile = document.getElementById("event-flyer-file");
  const eventSaveBtn = document.getElementById("event-save-btn");
  const eventCancelEditBtn = document.getElementById("event-cancel-edit");
  const eventEditId = document.getElementById("event-edit-id");
  const heroPhotoFile = document.getElementById("hero-photo-file");
  const galleryFiles = document.getElementById("gallery-files");
  const tableSaveBtn = document.getElementById("table-save-btn");
  const tableCancelEditBtn = document.getElementById("table-cancel-edit");
  const tableEditId = document.getElementById("table-edit-id");

  const resetEventFormState = () => {
    if (!(eventForm instanceof HTMLFormElement)) return;
    eventForm.reset();
    pendingEventFlyer = "";
    if (eventEditId instanceof HTMLInputElement) {
      eventEditId.value = "";
    }
    if (eventSaveBtn instanceof HTMLButtonElement) {
      eventSaveBtn.textContent = "Adicionar evento";
    }
    if (eventCancelEditBtn instanceof HTMLButtonElement) {
      eventCancelEditBtn.hidden = true;
    }
    setPreviewImage("event-flyer-preview", "");
    if (eventFlyerFile instanceof HTMLInputElement) {
      eventFlyerFile.value = "";
    }
  };

  const resetTableFormState = () => {
    if (!(tableForm instanceof HTMLFormElement)) return;
    tableForm.reset();
    if (tableEditId instanceof HTMLInputElement) {
      tableEditId.value = "";
    }
    if (tableSaveBtn instanceof HTMLButtonElement) {
      tableSaveBtn.textContent = "Adicionar mesa";
    }
    if (tableCancelEditBtn instanceof HTMLButtonElement) {
      tableCancelEditBtn.hidden = true;
    }
  };

  const handleEventSave = () => {
    const title = document.getElementById("event-title");
    const date = document.getElementById("event-date");
    const price = document.getElementById("event-price");
    const details = document.getElementById("event-details");

    if (
      !(title instanceof HTMLInputElement) ||
      !(date instanceof HTMLInputElement) ||
      !(price instanceof HTMLInputElement) ||
      !(details instanceof HTMLTextAreaElement)
    ) {
      return;
    }

    if (!title.value.trim() || !date.value.trim() || !price.value.trim() || !details.value.trim()) {
      alert("Preencha todos os campos do evento.");
      return;
    }

    const editingId = eventEditId instanceof HTMLInputElement ? eventEditId.value : "";
    const editingEvent = editingId ? state.events.find((item) => item.id === editingId) : null;

    let flyerToSave = pendingEventFlyer;
    if (!flyerToSave && editingEvent) {
      flyerToSave = editingEvent.flyer;
    }
    if (!flyerToSave) {
      flyerToSave = state.home.gallery[0] ? state.home.gallery[0].src : HERO_FALLBACK_IMAGE;
    }

    if (editingEvent) {
      editingEvent.title = title.value.trim();
      editingEvent.date = date.value.trim();
      editingEvent.entryPrice = price.value.trim();
      editingEvent.details = details.value.trim();
      editingEvent.flyer = flyerToSave;
    } else {
      const newEventId = makeId("evento");
      state.events.push({
        id: newEventId,
        title: title.value.trim(),
        date: date.value.trim(),
        flyer: flyerToSave,
        entryPrice: price.value.trim(),
        details: details.value.trim()
      });

      state.eventTableTypes[newEventId] = deepCopy(defaultState.tableTypes).map((tableType) => ({
        ...tableType,
        id: makeId("mesa")
      }));
    }

    saveState();
    resetEventFormState();
    renderEvents();
    renderAdminLists();
  };

  const handleTableSave = () => {
    const name = document.getElementById("table-name");
    const qty = document.getElementById("table-qty");
    const notes = document.getElementById("table-notes");
    const eventIdSelect = document.getElementById("table-event-id");

    if (
      !(name instanceof HTMLInputElement) ||
      !(qty instanceof HTMLInputElement) ||
      !(notes instanceof HTMLInputElement) ||
      !(eventIdSelect instanceof HTMLSelectElement)
    ) {
      return;
    }

    const eventId = eventIdSelect.value;
    if (!eventId) {
      alert("Selecione o evento para cadastrar essa mesa.");
      return;
    }

    if (!name.value.trim()) {
      alert("Informe o nome da mesa.");
      return;
    }

    if (!Array.isArray(state.eventTableTypes[eventId])) {
      state.eventTableTypes[eventId] = [];
    }

    const editingId = tableEditId instanceof HTMLInputElement ? tableEditId.value : "";
    const existing = editingId ? state.eventTableTypes[eventId].find((item) => item.id === editingId) : null;

    if (existing) {
      existing.name = name.value.trim();
      existing.quantity = Math.max(Number(qty.value) || 1, 1);
      existing.notes = notes.value.trim();
    } else {
      state.eventTableTypes[eventId].push({
        id: makeId("mesa"),
        name: name.value.trim(),
        quantity: Math.max(Number(qty.value) || 1, 1),
        notes: notes.value.trim()
      });
    }

    saveState();
    resetTableFormState();
    renderAdminLists();
    if (selectedEventId === eventId) {
      renderTableOptions(eventId);
    }
  };

  if (
    !(loginWrap instanceof HTMLElement) ||
    !(panel instanceof HTMLElement) ||
    !(openBtn instanceof HTMLButtonElement) ||
    !(closeBtn instanceof HTMLButtonElement) ||
    !(pin instanceof HTMLInputElement)
  ) {
    return;
  }

  openBtn.addEventListener("click", () => {
    if (pin.value !== state.adminPin) {
      alert("PIN admin invalido.");
      return;
    }

    loginWrap.hidden = true;
    panel.hidden = false;
    pin.value = "";

    pendingEventFlyer = "";
    pendingHeroMedia = "";
    pendingGalleryImages = [];

    resetEventFormState();
    resetTableFormState();
    setHeroPreview(state.home.heroMedia || state.home.heroImage);
    setGalleryPreview(state.home.gallery.map((item) => item.src));

    renderAdminLists();
  });

  closeBtn.addEventListener("click", () => {
    panel.hidden = true;
    loginWrap.hidden = false;
  });

  if (eventForm instanceof HTMLFormElement) {
    eventForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleEventSave();
    });
  }

  if (eventSaveBtn instanceof HTMLButtonElement) {
    eventSaveBtn.addEventListener("click", handleEventSave);
  }

  if (eventCancelEditBtn instanceof HTMLButtonElement) {
    eventCancelEditBtn.addEventListener("click", resetEventFormState);
  }

  if (tableForm instanceof HTMLFormElement) {
    tableForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleTableSave();
    });
  }

  if (tableSaveBtn instanceof HTMLButtonElement) {
    tableSaveBtn.addEventListener("click", handleTableSave);
  }

  if (tableCancelEditBtn instanceof HTMLButtonElement) {
    tableCancelEditBtn.addEventListener("click", resetTableFormState);
  }

  if (homeForm instanceof HTMLFormElement) {
    homeForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (pendingHeroMedia) {
        state.home.heroMedia = pendingHeroMedia;
        state.home.heroImage = pendingHeroMedia;
      }

      if (pendingGalleryImages.length) {
        state.home.gallery = pendingGalleryImages.map((src, index) => ({ src, alt: `Foto Via Paris ${index + 1}` }));
      }

      saveState();
      applyHomeImages();
      renderGallery();
      pendingHeroMedia = "";
      pendingGalleryImages = [];
      if (heroPhotoFile instanceof HTMLInputElement) {
        heroPhotoFile.value = "";
      }
      if (galleryFiles instanceof HTMLInputElement) {
        galleryFiles.value = "";
      }
      setHeroPreview(state.home.heroMedia || state.home.heroImage);
      setGalleryPreview(state.home.gallery.map((item) => item.src));
      alert("Fotos da home atualizadas.");
    });
  }

  setupDropzone("event-flyer-drop", "event-flyer-file", async (files) => {
    const image = files.find((file) => file.type.startsWith("image/"));
    if (!image) return;
    pendingEventFlyer = await fileToDataUrl(image);
    setPreviewImage("event-flyer-preview", pendingEventFlyer);
  });

  setupDropzone("hero-drop", "hero-photo-file", async (files) => {
    const media = files.find((file) => file.type.startsWith("image/") || file.type.startsWith("video/"));
    if (!media) return;
    pendingHeroMedia = await fileToDataUrl(media);
    setHeroPreview(pendingHeroMedia);
  });

  setupDropzone("gallery-drop", "gallery-files", async (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (!imageFiles.length) return;

    const uploaded = await Promise.all(imageFiles.map((file) => fileToDataUrl(file)));
    pendingGalleryImages = uploaded;
    setGalleryPreview(uploaded);
  });

  if (eventList instanceof HTMLElement) {
    eventList.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const editEventId = target.getAttribute("data-edit-event");
      const eventId = target.getAttribute("data-delete-event");

      if (editEventId) {
        const eventItem = state.events.find((item) => item.id === editEventId);
        const title = document.getElementById("event-title");
        const date = document.getElementById("event-date");
        const price = document.getElementById("event-price");
        const details = document.getElementById("event-details");
        if (
          eventItem &&
          title instanceof HTMLInputElement &&
          date instanceof HTMLInputElement &&
          price instanceof HTMLInputElement &&
          details instanceof HTMLTextAreaElement
        ) {
          title.value = eventItem.title;
          date.value = eventItem.date;
          price.value = eventItem.entryPrice;
          details.value = eventItem.details;
          if (eventEditId instanceof HTMLInputElement) {
            eventEditId.value = eventItem.id;
          }
          pendingEventFlyer = "";
          setPreviewImage("event-flyer-preview", eventItem.flyer);
          if (eventSaveBtn instanceof HTMLButtonElement) {
            eventSaveBtn.textContent = "Salvar evento";
          }
          if (eventCancelEditBtn instanceof HTMLButtonElement) {
            eventCancelEditBtn.hidden = false;
          }
        }
        return;
      }

      if (!eventId) return;

      state.events = state.events.filter((item) => item.id !== eventId);
      delete state.eventTableTypes[eventId];
      state.reservations = state.reservations.filter((item) => item.eventId !== eventId);
      saveState();
      renderEvents();
      renderAdminLists();
    });
  }

  if (tableList instanceof HTMLElement) {
    tableList.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const editTableId = target.getAttribute("data-edit-table");
      const tableId = target.getAttribute("data-delete-table");
      const eventId = target.getAttribute("data-event-id");

      if (editTableId && eventId) {
        const eventTables = getEventTableTypes(eventId);
        const tableItem = eventTables.find((item) => item.id === editTableId);
        const eventIdSelect = document.getElementById("table-event-id");
        const name = document.getElementById("table-name");
        const qty = document.getElementById("table-qty");
        const notes = document.getElementById("table-notes");

        if (
          tableItem &&
          eventIdSelect instanceof HTMLSelectElement &&
          name instanceof HTMLInputElement &&
          qty instanceof HTMLInputElement &&
          notes instanceof HTMLInputElement
        ) {
          eventIdSelect.value = eventId;
          name.value = tableItem.name;
          qty.value = String(tableItem.quantity);
          notes.value = tableItem.notes || "";
          if (tableEditId instanceof HTMLInputElement) {
            tableEditId.value = tableItem.id;
          }
          if (tableSaveBtn instanceof HTMLButtonElement) {
            tableSaveBtn.textContent = "Salvar mesa";
          }
          if (tableCancelEditBtn instanceof HTMLButtonElement) {
            tableCancelEditBtn.hidden = false;
          }
        }
        return;
      }

      if (!tableId) return;

      if (!eventId || !Array.isArray(state.eventTableTypes[eventId])) return;

      state.eventTableTypes[eventId] = state.eventTableTypes[eventId].filter((item) => item.id !== tableId);
      state.reservations = state.reservations.filter((item) => !(item.eventId === eventId && item.tableTypeId === tableId));
      saveState();
      renderAdminLists();
    });
  }
}

async function initApp() {
  state = await loadState();
  normalizeState();

  renderMenu();
  applyHomeImages();
  renderGallery();
  renderEvents();
  setupMobileMenu();
  setupLightbox();
  setupEvents();
  setupAdmin();

  // If there are local changes pending cloud sync, keep retrying in the background.
  if (hasPendingSync()) {
    void flushStateToCloud();
  }
}

void initApp();

window.addEventListener("online", () => {
  if (hasPendingSync()) {
    void flushStateToCloud();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && hasPendingSync()) {
    void flushStateToCloud();
  }
});
