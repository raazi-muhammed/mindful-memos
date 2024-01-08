import sgMail from "@sendgrid/mail";
import { NoteType } from "../models/note.model";

const API_KEY = process.env.SEND_GRID_API_KEY;

const sendEmail = async ({
    to,
    text,
    html,
}: {
    to: string;
    text: string;
    html: string;
}) => {
    if (!API_KEY) return null;

    sgMail.setApiKey(API_KEY);

    const message = {
        to: to,
        from: "raazi6163@gmail.com",
        subject: "Daily Memos",
        text: text,
        html: html,
    };

    return sgMail
        .send(message)
        .then((res) => {
            return `Mail Send to ${to}`;
        })
        .catch((res) => {
            return `Mail Send Failed to ${to}`;
        });
};

const makeEmailText = (note: NoteType) => {
    return `
    ${note.title}

    ${note.content}
    `;
};

const makeEmailHtml = (note: NoteType) => {
    return `
    <!DOCTYPE html>
<html>
<head>
<title>Daily Memo</title>
</head>
<body>

<h1>${note.title}</h1>
<p>${note.content}</p>

<p>by Mindful Memos</p>

</body>
</html>

    `;
};
export type EmailServiceType = {
    sendEmail: typeof sendEmail;
    makeEmailText: typeof makeEmailText;
    makeEmailHtml: typeof makeEmailHtml;
};

const emailService = {
    sendEmail,
    makeEmailText,
    makeEmailHtml,
};

export default emailService;
