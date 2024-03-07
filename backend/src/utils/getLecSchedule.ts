// fetch schedule data from lolesports.com

import puppeteer, { HTTPResponse, HTTPRequest } from "puppeteer";
import UserAgent from "user-agents";
import { GameEvent } from "../types/LecEvent";

const getLecSchedule = async (): Promise<GameEvent[] | undefined> => {
  let data: GameEvent[] | undefined;

  // detect the getSchedule request, manipulate it and get the response
  const processRequest = (request: HTTPRequest) => {
    // change the request url to get the schedule in english
    if (request.url().includes("getSchedule")) {
      const newUrl = request.url().replace(/hl=[a-z]{2}-[A-Z]{2}/, "hl=en-GB");
      request.continue({ url: newUrl });
    } else {
      request.continue();
    }
  };

  // listen for the schedule response
  const processResponse = async (response: HTTPResponse) => {
    const headers = response.headers();
    // only process response if it's the schedule and not empty
    if (
      response.url().includes("getSchedule") &&
      headers["content-length"] !== "0"
    ) {
      try {
        const json = await response.json();
        const events = (json?.data?.schedule?.events || []).map(
          (event: any) => ({
            ...event,
            startTime: new Date(event.startTime),
          })
        );
        data = events;
      } catch (err) {
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
