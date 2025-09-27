import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { saveFormSubmission } from "@/lib/form-submission"

const SENDWITH_API_KEY = "7d4db474cad47167840902714f1dbc8583792fb2c077e935bf21292331776b54"
const SENDWITH_API_URL = "https://app.sendwith.email/api/send"

async function sendEmailWithSendWith(to: string, subject: string, body: string, from = "info@martello1930.net") {
  console.log("[v0] Sending email via SendWith:", { to, subject, from })

  try {
    const response = await fetch(SENDWITH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDWITH_API_KEY}`,
      },
      body: JSON.stringify({
        message: {
          to: [{ email: to }],
          from: { email: from },
          subject: subject,
          body: body,
        },
      }),
    })

    console.log("[v0] SendWith response status:", response.status)

    if (response.ok) {
      const responseData = await response.json()
      console.log("[v0] Email sent successfully:", responseData)
      return { success: true, data: responseData }
    } else {
      const errorText = await response.text()
      console.error("[v0] SendWith API error:", errorText)
      return { success: false, error: `API Error: ${response.status} - ${errorText}` }
    }
  } catch (error) {
    console.error("[v0] SendWith request failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, cognome, email, telefono, prodotto, messaggio } = body

    console.log("[v0] Processing quote request:", { nome, cognome, email, prodotto })

    // Save to database first using admin client to bypass RLS
    const supabase = createAdminClient()

    const { data: leadData, error: dbError } = await supabase
      .from("leads")
      .insert([
        {
          nome,
          cognome,
          email,
          telefono,
          prodotto,
          messaggio: messaggio || "",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (dbError) {
      console.error("[v0] Database error:", dbError)
      return NextResponse.json(
        { success: false, message: "Errore nel salvataggio dei dati", error: dbError.message },
        { status: 500 },
      )
    }

    console.log("[v0] Quote request saved to database:", leadData)

    try {
      await saveFormSubmission({
        form_type: "preventivo",
        client_name: `${nome} ${cognome}`,
        client_email: email,
        client_phone: telefono,
        message: messaggio,
        product_type: prodotto,
        additional_data: {
          source: "preventivo_form",
          timestamp: new Date().toISOString(),
          lead_id: leadData?.[0]?.id,
        },
      })
      console.log("[v0] Form data also saved to form_submissions table")
    } catch (formDbError) {
      console.error("[v0] Failed to save to form_submissions:", formDbError)
      // Continue with email sending even if form_submissions save fails
    }

    // Send emails
    const companyEmailContent = `
Nuova Richiesta di Preventivo - Martello 1930

Nome: ${nome} ${cognome}
Email: ${email}
Telefono: ${telefono || "Non fornito"}
Prodotto di interesse: ${prodotto || "Non specificato"}

Messaggio:
${messaggio || "Nessun messaggio aggiuntivo"}

---
Questa email è stata inviata automaticamente dal form preventivi del sito web Martello 1930.
    `.trim()

    const customerEmailContent = `
Grazie per la sua richiesta di preventivo!

Gentile ${nome},

Abbiamo ricevuto la sua richiesta di preventivo per ${prodotto} e la contatteremo al più presto.

Riepilogo della sua richiesta:
- Prodotto di interesse: ${prodotto || "Non specificato"}
- Messaggio: ${messaggio || "Nessun messaggio aggiuntivo"}

I nostri esperti analizzeranno la sua richiesta e la ricontatteranno entro 24 ore per fornirle un preventivo personalizzato e gratuito.

I nostri contatti:
Telefono: 0185-41793
Email: info@martello1930.net

Sede Principale: Via Traversaro, 13 - 16039 Sestri Levante (GE)
Sede Espositiva: Via Aurelia - Sestri Levante (GE)

Orari di Apertura:
Lunedì - Venerdì: 8:00 - 12:00 / 14:00 - 18:00
Sabato: 8:00 - 12:00
Domenica: Chiuso

Cordiali saluti,
Il team Martello 1930

---
Idee qualità e passione dal 1930
    `.trim()

    console.log("[v0] Sending company notification email...")
    const companyEmailResult = await sendEmailWithSendWith(
      "info@martello1930.net",
      `Nuova richiesta preventivo da ${nome} ${cognome}`,
      companyEmailContent,
      "info@martello1930.net",
    )

    if (!companyEmailResult.success) {
      console.error("[v0] Failed to send company email:", companyEmailResult.error)
      return NextResponse.json(
        {
          success: false,
          message: "Dati salvati ma errore nell'invio dell'email aziendale",
          error: companyEmailResult.error,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Sending customer confirmation email...")
    const customerEmailResult = await sendEmailWithSendWith(
      email,
      "Conferma ricezione richiesta preventivo - Martello 1930",
      customerEmailContent,
      "info@martello1930.net",
    )

    if (!customerEmailResult.success) {
      console.error("[v0] Failed to send customer email:", customerEmailResult.error)
      // Don't fail the entire request if customer email fails
      console.log("[v0] Company email sent successfully, customer email failed")
    }

    console.log("[v0] Quote request processing completed successfully")

    return NextResponse.json({
      success: true,
      message: "Richiesta di preventivo inviata con successo! Riceverà una conferma via email.",
      details: {
        companyEmail: companyEmailResult.success,
        customerEmail: customerEmailResult.success,
      },
    })
  } catch (error) {
    console.error("[v0] Error processing quote request:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Errore nell'invio della richiesta di preventivo",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
