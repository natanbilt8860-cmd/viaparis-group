module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const teamNumber = process.env.WHATSAPP_TEAM_NUMBER;
  const apiVersion = process.env.WHATSAPP_API_VERSION || "v21.0";

  if (!accessToken || !phoneNumberId || !teamNumber) {
    return res.status(500).json({
      error: "Missing WhatsApp environment variables"
    });
  }

  try {
    const {
      reservationId,
      eventTitle,
      eventDate,
      tableName,
      name,
      phone,
      guests,
      note,
      createdAt
    } = req.body || {};

    const message = [
      "Nova reserva - Via Paris",
      `Reserva: ${reservationId || "-"}`,
      `Evento: ${eventTitle || "-"}`,
      `Data evento: ${eventDate || "-"}`,
      `Mesa: ${tableName || "-"}`,
      `Cliente: ${name || "-"}`,
      `Telefone: ${phone || "-"}`,
      `Pessoas: ${guests || "-"}`,
      `Observacoes: ${note || "-"}`,
      `Criada em: ${createdAt || new Date().toISOString()}`
    ].join("\n");

    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: teamNumber,
          type: "text",
          text: {
            body: message,
            preview_url: false
          }
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API error:", JSON.stringify(result));
      return res.status(response.status).json({
        error: "WhatsApp API error",
        details: result
      });
    }

    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error",
      details: String(error && error.message ? error.message : error)
    });
  }
};
