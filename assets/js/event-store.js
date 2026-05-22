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
        startAt: "2026-05-22T23:00:00.000Z",
        endLabel: "6:00am",
        address: "Chaussée d'Alsemberg 5, 1060 Bruxelles",
        venue: "VIA PARIS",
        singers: "TKS 2G",
        djs: "DJ L'Or, DJ Riva",
        specialGuests: "MC Nox",
        entryPrice: "20 EUR",
        description: "Showcase exclusif, ambiance immersive et performance live.",
        tags: ["Afro House", "Showcase"],
        flyer: baseFlyers[0],
        tables: [
          { id: makeId("tbl"), name: "VIP Gold", price: "350 EUR", capacity: 6, available: 5 },
          { id: makeId("tbl"), name: "Lounge", price: "220 EUR", capacity: 4, available: 8 }
        ]
      },
      {
        id: makeId("evt"),
        title: "NO PARTY",
        startAt: "2026-05-23T23:00:00.000Z",
        endLabel: "5:00am",
        address: "Chaussée d'Alsemberg 5, 1060 Bruxelles",
        venue: "VIA PARIS",
        singers: "-",
        djs: "DJ Maze, DJ Rina",
        specialGuests: "Collectif NO PARTY",
        entryPrice: "15 EUR",
        description: "Edition underground avec line-up house et urban.",
        tags: ["House", "Underground"],
        flyer: baseFlyers[1],
        tables: [
          { id: makeId("tbl"), name: "VIP Black", price: "300 EUR", capacity: 6, available: 4 },
          { id: makeId("tbl"), name: "Standard", price: "180 EUR", capacity: 4, available: 10 }
        ]
      },
      {
        id: makeId("evt"),
        title: "BAILE BAILE",
        startAt: "2026-05-29T23:00:00.000Z",
        endLabel: "6:00am",
        address: "Chaussée d'Alsemberg 5, 1060 Bruxelles",
        venue: "VIA PARIS",
        singers: "MC Kalu",
        djs: "DJ Vibe, DJ Tino",
        specialGuests: "Dance Crew RioBrux",
        entryPrice: "18 EUR",
        description: "Nuit latino/baile avec show dancers et surprises.",
        tags: ["Latin Tech House", "Baile"],
        flyer: baseFlyers[2],
        tables: [
          { id: makeId("tbl"), name: "Front Stage", price: "400 EUR", capacity: 6, available: 3 },
          { id: makeId("tbl"), name: "Lounge", price: "240 EUR", capacity: 4, available: 7 }
        ]
      },
      {
        id: makeId("evt"),
        title: "LAPREMICE x GENEZIO (EXPERIENCE)",
        startAt: "2026-05-30T23:00:00.000Z",
        endLabel: "6:00am",
        address: "Chaussée d'Alsemberg 5, 1060 Bruxelles",
        venue: "VIA PARIS",
        singers: "Genezio",
        djs: "DJ Lino",
        specialGuests: "Lapremice Crew",
        entryPrice: "25 EUR",
        description: "Experience premium avec performance live et scene ouverte.",
        tags: ["Experience", "Special"],
        flyer: baseFlyers[3],
        tables: [
          { id: makeId("tbl"), name: "Artist Table", price: "500 EUR", capacity: 8, available: 2 },
          { id: makeId("tbl"), name: "VIP", price: "320 EUR", capacity: 6, available: 5 }
        ]
      }
    ];

    return {
      version: 2,
      updatedAt: new Date().toISOString(),
      adminPin: "1234",
      events: defaultEvents,
      reservations: []
    };
  }

  function normalizeTable(table) {
    return {
      id: table && table.id ? String(table.id) : makeId("tbl"),
      name: table && table.name ? String(table.name) : "Table",
      price: table && table.price ? String(table.price) : "0 EUR",
      capacity: Math.max(Number(table && table.capacity) || 1, 1),
      available: Math.max(Number(table && table.available) || 0, 0)
    };
  }

  function normalizeEvent(event) {
    return {
      id: event && event.id ? String(event.id) : makeId("evt"),
      title: event && event.title ? String(event.title) : "Untitled Event",
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
      tables: Array.isArray(event && event.tables) ? event.tables.map(normalizeTable) : []
    };
  }

  function normalizeReservation(reservation) {
    return {
      id: reservation && reservation.id ? String(reservation.id) : makeId("rsv"),
      eventId: reservation && reservation.eventId ? String(reservation.eventId) : "",
      tableId: reservation && reservation.tableId ? String(reservation.tableId) : "",
      name: reservation && reservation.name ? String(reservation.name) : "",
      phone: reservation && reservation.phone ? String(reservation.phone) : "",
      guests: Math.max(Number(reservation && reservation.guests) || 1, 1),
      note: reservation && reservation.note ? String(reservation.note) : "",
      createdAt: toISODateTime(reservation && reservation.createdAt) || new Date().toISOString()
    };
  }

  function normalizeData(data) {
    const source = data && typeof data === "object" ? data : {};
    return {
      version: 2,
      updatedAt: toISODateTime(source.updatedAt) || new Date().toISOString(),
      adminPin: source.adminPin ? String(source.adminPin) : "1234",
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
          capacity: Math.max(Number(table.quantity) || 1, 1),
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
        adminPin: legacy.adminPin || "1234",
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
