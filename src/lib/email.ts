import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
}

export async function sendActivationCode(email: string, fullName: string, code: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .code { background: #667eea; color: white; font-size: 32px; font-weight: bold; padding: 20px; text-align: center; letter-spacing: 5px; border-radius: 5px; margin: 20px 0; }
        .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Добро пожаловать в Anidranium Academy!</h1>
        </div>
        <div class="content">
          <p>Здравствуйте, ${fullName}!</p>
          <p>Ваша регистрация была одобрена! Для активации доступа используйте следующий код:</p>
          <div class="code">${code}</div>
          <p>Или перейдите по ссылке и введите код вручную:</p>
          <a href="${appUrl}/activate" class="button">Активировать аккаунт</a>
          <p><strong>Код действителен в течение 24 часов.</strong></p>
        </div>
      </div>
    </body>
    </html>
  `
  
  return sendEmail({
    to: email,
    subject: 'Активация аккаунта Anidranium Academy',
    html
  })
}

export async function sendRegistrationNotification(adminEmail: string, userData: { fullName: string, email: string, studentCode: string, createdAt: Date }) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif;">
      <h2>Новая регистрация</h2>
      <p><strong>ФИО:</strong> ${userData.fullName}</p>
      <p><strong>Email:</strong> ${userData.email}</p>
      <p><strong>Код ученика:</strong> ${userData.studentCode}</p>
      <p><strong>Время регистрации:</strong> ${new Date(userData.createdAt).toLocaleString('ru-RU')}</p>
      <a href="${appUrl}/admin/users/pending" style="display: inline-block; background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Перейти к ожидающим регистрациям</a>
    </body>
    </html>
  `
  
  return sendEmail({
    to: adminEmail,
    subject: 'Новая регистрация на платформе',
    html
  })
}

export async function sendAccessExpiringNotification(email: string, fullName: string, daysLeft: number) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif;">
      <h2>Ваш доступ заканчивается</h2>
      <p>Здравствуйте, ${fullName}!</p>
      <p>Ваш доступ к Anidranium Academy закончится через <strong>${daysLeft} дней</strong>.</p>
      <p>Для продления доступа обратитесь к администратору.</p>
    </body>
    </html>
  `
  
  return sendEmail({
    to: email,
    subject: 'Доступ заканчивается',
    html
  })
}
