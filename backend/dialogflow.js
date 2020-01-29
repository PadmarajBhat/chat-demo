const dialogflow = require('dialogflow');

const LANGUAGE_CODE = 'en-US'

class DialogFlow {
  constructor(projectId) {
    this.projectId = "gecko-api2";

    let privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDGwOpJT06s6Kx0\nwJeo0FW0t5qdg5rwlkr2mfFcM / fRU5vka7mjO7v//tVZQ/26ByjQiVDTXN1jvWpR\njfvI3Cxx6CRDhe9n+M6tswT4o6CNcUSqP7gEbq2eqWWAHKU2kMqljg3DEvoKNQJS\nUDJwhJyArTdB6enO3GSyDGzIjq3zO+vp1v4z8nE3iHtAotpzxe1RQzhRNGVQ/njJ\n2SZn00aHOMeWLILmg2Gg2EwC9n1C9QzzzbvLr+TKmgMXfe0ifs7fNXj9suBEaBZL\nWN0RfiyQQZd/MoLkWwoA4WCYYlL5S7m+rydVLDXXfkcg2EpzuCoV4TkYYRrCeZxQ\ntLIsDS5rAgMBAAECggEAGuiYb6dx7pKrx+d2lk+VIvFEA3UDako2yPn2RaDwOXdu\ni4zoJl5FKYyuBDa30yf6pyJy08LmuFph2rvJ2HEIABNJVu5QXOJrJ5+CmfUb8g+2\nl67RHPctFhDiIeepmIse3IOF1SDXGGsChElrosnZdHRpyZ3qiUFTzWVFlHD4wmLf\nbUepKWY/eH2NPTCp78TgIhY6MeR9mpk5U8Y4cr3R39kvxgQTNRyN1G9i8ETp70Lw\n9ClAH0k1b2yHP9PZxYbWr4Rp01h764t9PwZVvtaly05vktQ+LCYgosXxMK0OJyRS\nqqfkkIx4IaeOLdOdejyxkYBw1nM1CDHd2S+heTpe7QKBgQD++B7zll4Ajd1yWxTz\nSm2gBleO2pGBuFSuTti1cz0kwbvdTiAbiReDF1t0N6J/9mqcZT0byWIHIJ1lokLR\nI2leHOr1BrX8ucVPIgpCHuxI9cZ6bX83oNCQor5FcJVfWrZ7Vql5hoXw74Kh6CNf\nD02hKeqvelR+NdxxfFRX2IuVxwKBgQDHjp062/6P2Y6iAgUMhuTKXh7wP6X+3SOb\nUSLMNMUV3Ds0rPLbv7ytFvP1LjGxXWJmsjXsz/FfwR4bfPXbS1YynZuJaQ4sVuMs\nHBSw92B4oD1pdj7j3aQZ2dGvvFL+bu36qsAnRYE6O21yn4R9+FYEWanPXGPihzFS\nWIn1MamSPQKBgDI/zDnNhLEvRFlpQfPA02IaXd81jD+4iFfiCiuYjpBT7iZrY0CK\nACxByjBZVplJgzFXcnerdLpa3ypMlEaLaBS4NkYcEHnCUvSJjOQDHCY06ezu74eT\nFgerSzx8N7QXOKeOKNBehr85NNGb4ny1k2MT08DJpyVIkC19h1HYx4m5AoGAaeW6\ndjOsYPXYhQyBVWZ4HxPXYzLDif4cGR3zU15lf/ZAzPFCZ27WVxwpFeEPqcmeoFTN\n3P90XZYDvh6P8XGHKpEMqty/ErSBFTVJnaeI4DpYnJCNSyqhHL7EUXekqzR+wVi/\nY5e0vgwvRnZ0Psz8CI70V//1WY7Yk5Q8kYtrKxkCgYABnHYqhZs86B6D+4VxtfVm\nPEpLweUGtmDj3uR1xoZ/+Y3jpud79y1HFXiz2V+iMYqNsnmaod8OBLA+cWmIAJY1\nzwl91L3iC7Ay8AqFtlOGZSM1oKhLj43bTKwJcsL3eUKATn3b7jaabY36OMI92FNe\ngoxwvCMCRypT44DkV/qHzw==\n-----END PRIVATE KEY-----\n";
    let clientEmail = "dialogflow-uodirc@gecko-api2.iam.gserviceaccount.com";
    let config = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail
      }
    }

    this.sessionClient = new dialogflow.SessionsClient(config)
  }

  async sendTextMessageToDialogFlow(textMessage, sessionId) {
    // Define session path
    const sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId);
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textMessage,
          languageCode: LANGUAGE_CODE
        }
      }
    }
    try {
      let responses = await this.sessionClient.detectIntent(request);
      console.log('DialogFlow.sendTextMessageToDialogFlow: Detected intent',responses[0]);
      //return responses[0]['queryResult']['fulfillmentText'];
      return responses;
    }
    catch (err) {
      console.error('DialogFlow.sendTextMessageToDialogFlow ERROR:', err);
      throw err;
    }
  }
}

module.exports = new DialogFlow();
