// We can use react-native Linking to send email
import qs from "qs";

export async function sendEmail(
    to,
    subject,
    body,
    options = {}
) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc,
    });

    if (query.length) {
        url += `?${query}`;
    }

    return window.open(url);
}
