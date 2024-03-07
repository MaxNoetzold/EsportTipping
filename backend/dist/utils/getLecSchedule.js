// fetch schedule data from lolesports.com
import puppeteer from "puppeteer";
import UserAgent from "user-agents";
const getLecSchedule = async () => {
    let data;
    // detect the getSchedule request, manipulate it and get the response
    const processRequest = (request) => {
        // change the request url to get the schedule in english
        if (request.url().includes("getSchedule")) {
            const newUrl = request.url().replace(/hl=[a-z]{2}-[A-Z]{2}/, "hl=en-GB");
            request.continue({ url: newUrl });
        }
        else {
            request.continue();
        }
    };
    // listen for the schedule response
    const processResponse = async (response) => {
        var _a, _b;
        const headers = response.headers();
        // only process response if it's the schedule and not empty
        if (response.url().includes("getSchedule") &&
            headers["content-length"] !== "0") {
            try {
                const json = await response.json();
                const events = (((_b = (_a = json === null || json === void 0 ? void 0 : json.data) === null || _a === void 0 ? void 0 : _a.schedule) === null || _b === void 0 ? void 0 : _b.events) || []).map((event) => ({
                    ...event,
                    startTime: new Date(event.startTime),
                }));
                data = events;
            }
            catch (err) {
                console.log("Error:", err);
            }
        }
    };
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // set user agent to prevent detection
    await page.setUserAgent(UserAgent.toString());
    await page.setRequestInterception(true);
    // setup listeners
    page.on("request", processRequest);
    page.on("response", processResponse);
    // open the actual page
    await page.goto("https://lolesports.com/schedule?leagues=lec");
    // wait for the responses to be finished
    await page.waitForNetworkIdle();
    await browser.close();
    return data;
};
export default getLecSchedule;
//# sourceMappingURL=getLecSchedule.js.map