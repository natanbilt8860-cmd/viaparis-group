module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const teamNumber = process.env.WHATSAPP_TEAM_NUMBER;
  const apiVersion = process.env.WHATSAPP_API_VERSION || "v21.0";
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLanguage = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "pt_BR";

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

    const templateParams = [
      name || "-",
      eventTitle || "-",
      eventDate || "-",
      tableName || "-",
      String(guests || "-"),
      phone || "-",
      note || "-"
    ];

    const templateRequestBody = {
      messaging_product: "whatsapp",
      to: teamNumber,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: templateLanguage
        },
        components: [
          {
            type: "body",
            parameters: templateParams.map((value) => ({
              type: "text",
              text: value
            }))
          }
        ]
      }
    };

    const textRequestBody = {
      messaging_product: "whatsapp",
      to: teamNumber,
      type: "text",
      text: {
        body: message,
        preview_url: false
      }
    };

    const sendWhatsAppMessage = async (body) => {
      const response = await fetch(
        `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const result = await response.json();
      return { response, result };
    };

    if (templateName) {
      const templateAttempt = await sendWhatsAppMessage(templateRequestBody);

      if (templateAttempt.response.ok) {
        return res.status(200).json({ ok: true, mode: "template", result: templateAttempt.result });
      }

      console.error("WhatsApp template send failed, trying text fallback:", JSON.stringify(templateAttempt.result));
    }

    const textAttempt = await sendWhatsAppMessage(textRequestBody);

    if (!textAttempt.response.ok) {
      console.error("WhatsApp API error:", JSON.stringify(textAttempt.result));
      return res.status(textAttempt.response.status).json({
        error: "WhatsApp API error",
        details: textAttempt.result
      });
    }

    return res.status(200).json({ ok: true, mode: "text", result: textAttempt.result });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error",
      details: String(error && error.message ? error.message : error)
    });
  }
};
