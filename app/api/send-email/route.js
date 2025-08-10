import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Garante que rode no ambiente Node

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('[DEBUG] Dados recebidos:', body);
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const confirmEmail = String(body?.confirmEmail ?? "").trim();
    const message = String(body?.message ?? "").trim();
    console.log('[DEBUG] Campos extraídos:', { name, email, confirmEmail, message });

    if (!name || !email || !confirmEmail || !message) {
      console.log('[DEBUG] Falha na validação: campos obrigatórios ausentes');
      return new Response(
        JSON.stringify({ success: false, message: "Todos os campos são obrigatórios!" }),
        { status: 400 }
      );
    }

    if (email !== confirmEmail) {
      console.log('[DEBUG] Falha na validação: e-mails não coincidem');
      return new Response(
        JSON.stringify({ success: false, message: "Os e-mails não coincidem!" }),
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('[DEBUG] Falha na validação: e-mail inválido');
      return new Response(
        JSON.stringify({ success: false, message: "E-mail inválido! Por favor insira um e-mail válido" }),
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.log('[DEBUG] Falha na validação: configuração SMTP ausente');
      return new Response(
        JSON.stringify({ success: false, message: "Configuração de e-mail ausente." }),
        { status: 500 }
      );
    }

    console.log('[DEBUG] Variáveis de ambiente SMTP:', {
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD ? '***' : undefined,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT
    });

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpSecure = smtpPort === 465;
    console.log('[DEBUG] Configuração SMTP:', { smtpHost, smtpPort, smtpSecure });

    const transporter = nodemailer.createTransport(
      smtpHost
        ? {
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
          }
        : {
            service: "gmail",
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
          }
    );

    console.log('[DEBUG] Enviando e-mail...');
    await transporter.sendMail({
      from: `"HSO Solutions" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "🚀 Nova Solicitação de Orçamento - HSO Solutions",
      html: `
        <h2>Nova Solicitação de Orçamento</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
    console.log('[DEBUG] E-mail enviado com sucesso!');

    return new Response(
      JSON.stringify({
        success: true,
        message: "🎉 Perfeito! Sua solicitação foi enviada com sucesso. Nossa equipe retornará em até 24 horas.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("/api/send-email error", error);
    return new Response(
      JSON.stringify({ success: false, message: "❌ Ops! Ocorreu um erro interno ao enviar o e-mail." }),
      { status: 500 }
    );
  }
}

