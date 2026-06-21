import { ContactFormData } from "@/schemas/contact";

export function generateContactHtml(body: ContactFormData) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
          
          <tr>
            <td style="background-color:#0a0a0a;padding:32px 40px;text-align:center;">
              <span style="color:#d4af37;font-size:22px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">
                Luca Lombardy
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px 8px 40px;">
              <h2 style="margin:0;color:#0a0a0a;font-size:18px;font-weight:600;">
                Новое сообщение с сайта
              </h2>
              <p style="margin:4px 0 0 0;color:#888888;font-size:13px;">
                Получено через форму обратной связи
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
                    <span style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Имя</span><br/>
                    <span style="color:#0a0a0a;font-size:15px;">${body.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
                    <span style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                    <a href="mailto:${body.email}" style="color:#d4af37;font-size:15px;text-decoration:none;">${body.email}</a>
                  </td>
                </tr>
                ${
                  body.phone
                    ? `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
                    <span style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Телефон</span><br/>
                    <span style="color:#0a0a0a;font-size:15px;">${body.phone}</span>
                  </td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding:16px 0 0 0;">
                    <span style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Сообщение</span><br/>
                    <p style="margin:8px 0 0 0;color:#0a0a0a;font-size:15px;line-height:1.6;white-space:pre-wrap;">${body.message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f9f9f9;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#aaaaaa;font-size:12px;">
                © ${new Date().getFullYear()} Luca Lombardy. Все права защищены.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
