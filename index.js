const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: "YjCiTcq1Lj6MeprbL8l1Qr6I8r6TP607zjrCH4Gnfl2jTTxE6xf74imYP968csryfBwJOkk9cIQplpyrrt7CBoJU6gIkxIg4w9kZjV1ze1jybg+pHosy5I5UiIE8hGiVPsZtVv9RsIHTT3f8mkwTPwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "c128d16d64b047d5d5daceafa7de542b",
};

const app = express();
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text,
  });
}

app.listen(3000);
