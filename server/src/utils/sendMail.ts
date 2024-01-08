import sgMail from "@sendgrid/mail";

const API_KEY = process.env.SEND_GRID_API_KEY;

export const sendEmail = ({ to, content }: { to: string; content: string }) => {
    if (!API_KEY) return null;

    sgMail.setApiKey(API_KEY);

    const message = {
        to: to,
        from: "raazi6163@gmail.com",
        subject: "Daily Mail Test",
        text: `${content}`,
        html: `<h1> ${content} </h1> `,
    };

    sgMail
        .send(message)
        .then((res) => {
            console.log(res, "Mail send");
        })
        .catch((err) => {
            console.log(err);
        });

    return null;
};
