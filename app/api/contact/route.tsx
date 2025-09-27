import { type NextRequest, NextResponse } from "next/server"
import { Buffer } from "buffer"
import { saveFormSubmission } from "@/lib/form-submission"

const SENDWITH_API_KEY = "7d4db474cad47167840902714f1dbc8583792fb2c077e935bf21292331776b54"
const SENDWITH_API_URL = "https://app.sendwith.email/api/send"

async function sendEmailWithSendWith(
  to: string,
  subject: string,
  body: string,
  from = "info@martello1930.net",
  attachments: any[] = [],
) {
  console.log("[v0] Sending email via SendWith:", { to, subject, from, attachmentsCount: attachments.length })

  try {
    const emailPayload: any = {
      message: {
        to: [{ email: to }],
        from: { email: from },
        subject: subject,
        body: body,
      },
    }

    if (attachments.length > 0) {
      emailPayload.message.attachments = attachments
    }

    const response = await fetch(SENDWITH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDWITH_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    })

    console.log("[v0] SendWith response status:", response.status)

    const responseText = await response.text()
    console.log("[v0] SendWith response text:", responseText.substring(0, 200))

    if (response.ok) {
      try {
        const responseData = JSON.parse(responseText)
        console.log("[v0] Email sent successfully:", responseData)
        return { success: true, data: responseData }
      } catch (parseError) {
        // If response is not JSON but status is OK, treat as success
        console.log("[v0] Response not JSON but status OK, treating as success")
        return { success: true, data: { message: responseText } }
      }
    } else {
      console.error("[v0] SendWith API error:", responseText)
      return { success: false, error: `API Error: ${response.status} - ${responseText}` }
    }
  } catch (error) {
    console.error("[v0] SendWith request failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return buffer.toString("base64")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { nome, cognome, email, telefono, prodotto, messaggio } = body

    console.log("[v0] Processing contact form:", { nome, cognome, email, prodotto })

    try {
      await saveFormSubmission({
        form_type: "contatto",
        client_name: `${nome} ${cognome}`,
        client_email: email,
        client_phone: telefono,
        message: messaggio,
        product_type: prodotto,
        additional_data: {
          source: "contact_form",
          timestamp: new Date().toISOString(),
        },
      })
      console.log("[v0] Form data saved to form_submissions table")
    } catch (dbError) {
      console.error("[v0] Failed to save form data:", dbError)
      // Continue with email sending even if database save fails
    }

    const companyEmailContent = `
Nuova Richiesta di Preventivo - Martello 1930

Nome: ${nome} ${cognome}
Email: ${email}
Telefono: ${telefono || "Non fornito"}
Prodotto di interesse: ${prodotto || "Non specificato"}

Messaggio:
${messaggio || "Nessun messaggio aggiuntivo"}

---
Questa email è stata inviata automaticamente dal sito web Martello 1930.
    `.trim()

    const customerEmailContent = `
Grazie per averci contattato!

Gentile ${nome},

Abbiamo ricevuto la sua richiesta di preventivo e la contatteremo al più presto.

Riepilogo della sua richiesta:
- Prodotto di interesse: ${prodotto || "Non specificato"}
- Messaggio: ${messaggio || "Nessun messaggio aggiuntivo"}

I nostri esperti analizzeranno la sua richiesta e la ricontatteranno entro 24 ore per fornirle un preventivo personalizzato.

I nostri contatti:
Telefono: 0185-41793
Email: info@martello1930.net
Indirizzo: Via Traversaro, 13 - 16039 Sestri Levante (GE)

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
          message: "Errore nell'invio dell'email aziendale",
          error: companyEmailResult.error,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Sending customer confirmation email...")
    const customerEmailResult = await sendEmailWithSendWith(
      email,
      "Conferma ricezione richiesta - Martello 1930",
      customerEmailContent,
      "info@martello1930.net",
    )

    if (!customerEmailResult.success) {
      console.error("[v0] Failed to send customer email:", customerEmailResult.error)
      // Don't fail the entire request if customer email fails
      console.log("[v0] Company email sent successfully, customer email failed")
    }

    console.log("[v0] Contact form processing completed successfully")

    return NextResponse.json({
      success: true,
      message: "Email inviate con successo",
      details: {
        companyEmail: companyEmailResult.success,
        customerEmail: customerEmailResult.success,
      },
    })
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Errore nell'invio dell'email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
