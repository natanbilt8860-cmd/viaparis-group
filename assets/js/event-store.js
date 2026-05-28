(function () {
  const STORAGE_KEY = "via-paris-events-v2";
  const LEGACY_KEY = "via-paris-dashboard-data";
  const SUPABASE_TABLE = "app_state";
  const SUPABASE_ROW_ID = "events_v2";

  function makeId(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
  }

  function deepCopy(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function toISODateTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString();
  }

  function parsePlacesRange(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const objectMin = Number(value.minPlaces);
      const objectMax = Number(value.maxPlaces);

      if (Number.isFinite(objectMin) && Number.isFinite(objectMax)) {
        const minPlaces = Math.max(Math.trunc(objectMin), 1);
        const maxPlaces = Math.max(Math.trunc(objectMax), minPlaces);
        return { minPlaces, maxPlaces };
      }

      if (value.places !== undefined) return parsePlacesRange(value.places);
      if (value.lugares !== undefined) return parsePlacesRange(value.lugares);
      if (value.capacity !== undefined) return parsePlacesRange(value.capacity);
      if (value.quantity !== undefined) return parsePlacesRange(value.quantity);
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      const maxPlaces = Math.max(Math.trunc(value), 1);
      return { minPlaces: 1, maxPlaces };
    }

    const text = String(value || "")
      .replace(/[\u00A0\u2000-\u200B]/g, " ")
      .trim();
    if (!text) return null;

    const normalized = text.replace(/[\u2010-\u2015\u2212]/g, "-").replace(/\s*[-–—]\s*/g, "-");

    const rangeMatch = normalized.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const minPlaces = Math.trunc(Number(rangeMatch[1]));
      const maxPlaces = Math.trunc(Number(rangeMatch[2]));

      if (minPlaces < 1 || maxPlaces < 1 || minPlaces > maxPlaces) {
        return null;
      }

      return { minPlaces, maxPlaces };
    }

    const singleMatch = text.match(/^(\d+)$/);
    if (singleMatch) {
      const maxPlaces = Math.max(Math.trunc(Number(singleMatch[1])), 1);
      return { minPlaces: 1, maxPlaces };
    }

    return null;
  }

  function formatPlacesRange(minPlaces, maxPlaces) {
    const minValue = Math.max(Number(minPlaces) || 1, 1);
    const maxValue = Math.max(Number(maxPlaces) || minValue, minValue);

    if (minValue === maxValue) {
      return `${minValue} pessoa${minValue === 1 ? "" : "s"}`;
    }

    return `${minValue} a ${maxValue} pessoas`;
  }
  function formatEuroPrice(value) {
    const text = String(value || "").trim();
    if (!text) return "0 EUR";
    return /\bEUR\b/i.test(text) ? text : `${text} EUR`;
  }

  function describePlacesRange(table) {
    const range = parsePlacesRange(table) || { minPlaces: 1, maxPlaces: 1 };
    return formatPlacesRange(range.minPlaces, range.maxPlaces);
  }

  function buildDefaultData() {
    const baseFlyers = [
      "/assets/images/parceria-pablo.png",
      "/assets/images/portfolio/upscalemedia-transformed_Nero_AI_Image_Upscaler_Photo_Face.png",
      "/assets/images/parceria-lisa.png",
      "/assets/images/parceria-nexvo.png"
    ];

    const defaultEvents = [
      {
        id: makeId("evt"),
        title: "CANDYWORLD x TKS 2G (SHOWCASE)",
        status: "active",
        capacity: 450,
        startAt: "2026-05-22T23:00:00.000Z",
        endLabel: "6:00am",
        address: "Chaussée d'Alsemberg 5, 1060 Bruxelles",
        venue: "VIA PARIS",
        singers: "TKS 2G",
        djs: "DJ L'Or, DJ Riva",
        specialGuests: "MC Nox",
        entryPrice: "20 EUR",
        description: "Apresentacao exclusiva, atmosfera imersiva e performance ao vivo.",
        tags: ["Afro House", "Apresentacao"],
        flyer: baseFlyers[0],
        tables: [
          { id: makeId("tbl"), name: "VIP Gold", price: "350 EUR", minPlaces: 1, maxPlaces: 6, capacity: 6, available: 5 },
          { id: makeId("tbl"), name: "Lounge", price: "220 EUR", minPlaces: 1, maxPlaces: 4, available: 8 }
        ]
      },
      {
        id: makeId("evt"),
        title: "NO PARTY",
        status: "active",
        capacity: 420,
        startAt: "2026-05-23T23:00:00.000Z",
        endLabel: "5:00am",
        address: "Chaussée d'Alsemberg 5, 1060 Bruxelles",
        venue: "VIA PARIS",
        singers: "-",
        djs: "DJ Maze, DJ Rina",
        specialGuests: "Collectif NO PARTY",
        entryPrice: "15 EUR",
        description: "Edicao underground com selecao house e urbana.",
        tags: ["House", "Underground"],
        flyer: baseFlyers[1],
        tables: [
          { id: makeId("tbl"), name: "VIP Black", price: "300 EUR", minPlaces: 1, maxPlaces: 6, capacity: 6, available: 4 },
          { id: makeId("tbl"), name: "Standard", price: "180 EUR", minPlaces: 1, maxPlaces: 4, available: 10 }
        ]
      },
      {
        id: makeId("evt"),
        title: "BAILE BAILE",
        status: "active",
        capacity: 500,
        startAt: "2026-05-29T23:00:00.000Z",
        endLabel: "6:00am",
        address: "Chaussée d'Alsemberg 5, 1060 Bruxelles",
        venue: "VIA PARIS",
        singers: "MC Kalu",
        djs: "DJ Vibe, DJ Tino",
        specialGuests: "Dance Crew RioBrux",
        entryPrice: "18 EUR",
        description: "Noite latina/baile com dancers e surpresas.",
        tags: ["Latin Tech House", "Baile"],
        flyer: baseFlyers[2],
        tables: [
          { id: makeId("tbl"), name: "Front Stage", price: "400 EUR", minPlaces: 1, maxPlaces: 6, capacity: 6, available: 3 },
          { id: makeId("tbl"), name: "Lounge", price: "240 EUR", minPlaces: 1, maxPlaces: 4, available: 7 }
        ]
      },
      {
        id: makeId("evt"),
        title: "LAPREMICE x GENEZIO (EXPERIENCE)",
        status: "active",
        capacity: 520,
        startAt: "2026-05-30T23:00:00.000Z",
        endLabel: "6:00am",
        address: "Chaussée d'Alsemberg 5, 1060 Bruxelles",
        venue: "VIA PARIS",
        singers: "Genezio",
        djs: "DJ Lino",
        specialGuests: "Lapremice Crew",
        entryPrice: "25 EUR",
        description: "Experiencia premium com performance ao vivo e palco aberto.",
        tags: ["Experiencia", "Especial"],
        flyer: baseFlyers[3],
        tables: [
          { id: makeId("tbl"), name: "Artist Table", price: "500 EUR", minPlaces: 1, maxPlaces: 8, capacity: 8, available: 2 },
          { id: makeId("tbl"), name: "VIP", price: "320 EUR", minPlaces: 1, maxPlaces: 6, available: 5 }
        ]
      }
    ];

    return {
      version: 2,
      updatedAt: new Date().toISOString(),
      adminPin: "123",
      publicContent: {
        siteContent: {
          heroSubtitle: "EST. 2019 · BRUXELAS",
          heroCta: "Comprar ingressos",
          quote: "Uma noite que ultrapassa tudo o que se espera de um bar.",
          motto: "Sem regras. Apenas ritmo."
        },
        partners: [],
        navbar: {
          home: true,
          agenda: true,
          event: false
        }
      },
      events: defaultEvents,
      reservations: []
    };
  }

  function normalizePublicContent(publicContent) {
    const source = publicContent && typeof publicContent === "object" ? publicContent : {};
    const siteContent = source.siteContent && typeof source.siteContent === "object" ? source.siteContent : {};
    const navbar = source.navbar && typeof source.navbar === "object" ? source.navbar : {};

    return {
      siteContent: {
        heroSubtitle: siteContent.heroSubtitle ? String(siteContent.heroSubtitle) : "EST. 2019 · BRUXELAS",
        heroCta: siteContent.heroCta ? String(siteContent.heroCta) : "Comprar ingressos",
        quote: siteContent.quote ? String(siteContent.quote) : "Uma noite que ultrapassa tudo o que se espera de um bar.",
        motto: siteContent.motto ? String(siteContent.motto) : "Sem regras. Apenas ritmo."
      },
      partners: Array.isArray(source.partners)
        ? source.partners.map((partner) => ({
            id: partner && partner.id ? String(partner.id) : makeId("ptr"),
            name: partner && partner.name ? String(partner.name) : "Parceiro",
            link: partner && partner.link ? String(partner.link) : "",
            logo: partner && partner.logo ? String(partner.logo) : "",
            description: partner && partner.description ? String(partner.description) : "",
            status: partner && partner.status === "inactive" ? "inactive" : "active",
            eventIds: Array.isArray(partner && partner.eventIds) ? partner.eventIds.map((id) => String(id)) : []
          }))
        : [],
      navbar: {
        home: navbar.home !== false,
        agenda: navbar.agenda !== false,
        event: Boolean(navbar.event)
      }
    };
  }

  function normalizeTable(table) {
    const range = parsePlacesRange(table) || { minPlaces: 1, maxPlaces: 1 };

    return {
      id: table && table.id ? String(table.id) : makeId("tbl"),
      name: table && table.name ? String(table.name) : "Table",
      price: formatEuroPrice(table && table.price ? String(table.price) : "0 EUR"),
      minPlaces: range.minPlaces,
      maxPlaces: range.maxPlaces,
      capacity: range.maxPlaces,
      available: Math.max(Number(table && table.available) || 0, 0)
    };
  }

  function normalizeEvent(event) {
    const normalizedTables = Array.isArray(event && event.tables) ? event.tables.map(normalizeTable) : [];
    const fallbackCapacity = normalizedTables.reduce((sum, table) => {
      const maxPlaces = Math.max(Number(table.maxPlaces) || 1, 1);
      const available = Math.max(Number(table.available) || 0, 0);
      return sum + maxPlaces * available;
    }, 0);

    return {
      id: event && event.id ? String(event.id) : makeId("evt"),
      title: event && event.title ? String(event.title) : "Untitled Event",
      status: ["active", "full", "finished"].includes(String(event && event.status || "").toLowerCase())
        ? String(event.status).toLowerCase()
        : "active",
      capacity: Math.max(Number(event && event.capacity) || fallbackCapacity || 0, 0),
      startAt: toISODateTime(event && event.startAt),
      endLabel: event && event.endLabel ? String(event.endLabel) : "",
      address: event && event.address ? String(event.address) : "",
      venue: event && event.venue ? String(event.venue) : "VIA PARIS",
      singers: event && event.singers ? String(event.singers) : "",
      djs: event && event.djs ? String(event.djs) : "",
      specialGuests: event && event.specialGuests ? String(event.specialGuests) : "",
      entryPrice: event && event.entryPrice ? String(event.entryPrice) : "",
      description: event && event.description ? String(event.description) : "",
      tags: Array.isArray(event && event.tags) ? event.tags.map((item) => String(item).trim()).filter(Boolean) : [],
      flyer: event && event.flyer ? String(event.flyer) : "/assets/images/logo-alt.png",
      tables: normalizedTables
    };
  }

  function normalizeReservation(reservation) {
    const rawStatus = String(reservation && reservation.status || "pending").toLowerCase();
    const status = ["pending", "approved", "rejected", "cancelled"].includes(rawStatus) ? rawStatus : "pending";

    return {
      id: reservation && reservation.id ? String(reservation.id) : makeId("rsv"),
      eventId: reservation && reservation.eventId ? String(reservation.eventId) : "",
      tableId: reservation && reservation.tableId ? String(reservation.tableId) : "",
      name: reservation && reservation.name ? String(reservation.name) : "",
      phone: reservation && reservation.phone ? String(reservation.phone) : "",
      guests: Math.max(Number(reservation && reservation.guests) || 1, 1),
      status,
      note: reservation && reservation.note ? String(reservation.note) : "",
      createdAt: toISODateTime(reservation && reservation.createdAt) || new Date().toISOString(),
      updatedAt: toISODateTime(reservation && reservation.updatedAt) || new Date().toISOString()
    };
  }

  function normalizeData(data) {
    const source = data && typeof data === "object" ? data : {};
    return {
      version: 2,
      updatedAt: toISODateTime(source.updatedAt) || new Date().toISOString(),
      adminPin: source.adminPin ? String(source.adminPin) : "123",
      publicContent: normalizePublicContent(source.publicContent),
      events: Array.isArray(source.events) ? source.events.map(normalizeEvent) : [],
      reservations: Array.isArray(source.reservations) ? source.reservations.map(normalizeReservation) : []
    };
  }

  function migrateFromLegacy() {
    try {
      const raw = localStorage.getItem(LEGACY_KEY);
      if (!raw) return null;
      const legacy = JSON.parse(raw);
      const events = Array.isArray(legacy.events) ? legacy.events : [];
      const eventTables = legacy.eventTableTypes && typeof legacy.eventTableTypes === "object" ? legacy.eventTableTypes : {};
      const reservations = Array.isArray(legacy.reservations) ? legacy.reservations : [];

      const migratedEvents = events.map((eventItem) => {
        const tables = Array.isArray(eventTables[eventItem.id]) ? eventTables[eventItem.id] : [];
        const mappedTables = tables.map((table) => ({
          id: table.id || makeId("tbl"),
          name: table.name || "Table",
          price: table.notes || "A definir",
          minPlaces: 1,
          maxPlaces: Math.max(Number(table.quantity) || 1, 1),
          available: Math.max(Number(table.quantity) || 1, 1)
        }));

        return normalizeEvent({
          id: eventItem.id,
          title: eventItem.title,
          startAt: eventItem.date,
          endLabel: "",
          address: "Chaussée d'Alsemberg 5, 1060 Bruxelles",
          venue: "VIA PARIS",
          singers: "",
          djs: "",
          specialGuests: "",
          entryPrice: eventItem.entryPrice,
          description: eventItem.details,
          tags: [],
          flyer: eventItem.flyer,
          tables: mappedTables
        });
      });

      const migratedReservations = reservations.map((item) =>
        normalizeReservation({
          id: item.id,
          eventId: item.eventId,
          tableId: item.tableTypeId,
          name: item.name,
          phone: item.phone,
          guests: item.guests,
          note: item.note,
          createdAt: item.createdAt
        })
      );

      return normalizeData({
        updatedAt: new Date().toISOString(),
        adminPin: legacy.adminPin || "123",
        events: migratedEvents,
        reservations: migratedReservations
      });
    } catch (_error) {
      return null;
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return normalizeData(JSON.parse(raw));
      }

      const migrated = migrateFromLegacy();
      if (migrated) {
        save(migrated);
        return migrated;
      }

      const seeded = buildDefaultData();
      save(seeded);
      return seeded;
    } catch (_error) {
      const fallback = buildDefaultData();
      save(fallback);
      return fallback;
    }
  }

  function save(data) {
    const normalized = normalizeData(data);
    normalized.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function update(mutator) {
    const current = load();
    const draft = deepCopy(current);
    mutator(draft);
    return save(draft);
  }

  function getEventById(data, eventId) {
    return data.events.find((item) => item.id === eventId) || null;
  }

  function getReservedCount(data, eventId, tableId) {
    return data.reservations.filter((item) => item.eventId === eventId && item.tableId === tableId).length;
  }

  function createSupabaseClient() {
    const config = window.VIA_PARIS_SUPABASE || {};
    if (!window.supabase || !config.url || !config.anonKey) return null;
    try {
      return window.supabase.createClient(config.url, config.anonKey);
    } catch (_error) {
      return null;
    }
  }

  async function pullCloud() {
    const client = createSupabaseClient();
    if (!client) return null;

    const { data, error } = await client
      .from(SUPABASE_TABLE)
      .select("state_json")
      .eq("id", SUPABASE_ROW_ID)
      .maybeSingle();

    if (error || !data || !data.state_json) return null;
    const cloudState = normalizeData(data.state_json);
    save(cloudState);
    return cloudState;
  }

  async function pushCloud(data) {
    const client = createSupabaseClient();
    if (!client) return null;

    const normalized = normalizeData(data);
    normalized.updatedAt = new Date().toISOString();

    const { error } = await client.from(SUPABASE_TABLE).upsert(
      {
        id: SUPABASE_ROW_ID,
        state_json: normalized,
        updated_at: normalized.updatedAt
      },
      { onConflict: "id" }
    );

    if (error) {
      throw new Error(error.message || "Cloud sync failed");
    }

    save(normalized);
    return normalized;
  }

  async function syncWithCloud() {
    const localState = load();
    const cloudState = await pullCloud();

    if (!cloudState) {
      await pushCloud(localState);
      return localState;
    }

    const localTs = new Date(localState.updatedAt || 0).getTime();
    const cloudTs = new Date(cloudState.updatedAt || 0).getTime();

    if (localTs > cloudTs) {
      await pushCloud(localState);
      return localState;
    }

    save(cloudState);
    return cloudState;
  }

  window.ViaParisEventsStore = {
    STORAGE_KEY,
    makeId,
    parsePlacesRange,
    formatPlacesRange,
    formatEuroPrice,
    describePlacesRange,
    load,
    save,
    update,
    getEventById,
    getReservedCount,
    pullCloud,
    pushCloud,
    syncWithCloud
  };
})();
