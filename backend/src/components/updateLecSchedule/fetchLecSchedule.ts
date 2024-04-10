// fetch schedule data from lolesports.com

import puppeteer, { HTTPResponse, HTTPRequest } from "puppeteer";
import UserAgent from "user-agents";
import { GameEvent } from "../../utils/types/LecEvent";
import formatLecEvents from "./formatLecEvents";
import FunctionRunTimerModel from "../../utils/mongodb/schemas/FunctionRunTimers";

const fetchLecScheduleIfNeeded = async () => {
  // check in the database if the last fetch was more than an hour ago
  const timer = await FunctionRunTimerModel.findOne({
    functionName: "fetchLecSchedule",
  }).lean();
  if (timer) {
    const now = new Date();
    if (now.getTime() - timer.timestamp.getTime() < 3600000) {
      // if not, return
      return [];
    }
  }

  // if so, fetch the schedule
  const data = await fetchLecSchedule();
  // save the timestamp of the fetch
  if (data) {
    await FunctionRunTimerModel.updateOne(
      { functionName: "fetchLecSchedule" },
      { timestamp: new Date() },
      { upsert: true }
    );
  }
  return data;
};

const fetchLecSchedule = async () => {
  let data: GameEvent[] | undefined;

  // detect the getSchedule request, manipulate it and get the response
  const processRequest = (request: HTTPRequest) => {
    // change the request url to get the schedule in english
    if (request.url().includes("operationName=ScheduleEventsQuery")) {
      const newUrl = request.url().replace(/[a-z]{2}-[A-Z]{2}/, "en-GB");
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
      response.url().includes("operationName=ScheduleEventsQuery") &&
      headers["content-length"] !== "0"
    ) {
      try {
        const json = await response.json();
        const newData = formatLecEvents(json?.data?.esports?.events || []);
        // dont overwrite the data if it's already set
        if (newData.length > 0 && !data) {
          data = newData;
        }
      } catch (err) {
        console.error("Process Response:", err);
      }
    }
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // set user agent to prevent detection
  const userAgent = new UserAgent();
  const userAgentString = userAgent.toString();
  await page.setUserAgent(userAgentString);
  await page.setRequestInterception(true);
  // setup listeners
  page.on("request", processRequest);
  page.on("response", processResponse);
  page.on("requestfailed", (request) => {
    console.error("Request failed", request.url());
  });
  // open the actual page
  await page.goto("https://lolesports.com/en-GB/schedule?leagues=lec");
  // wait for the responses to be finished
  await page.waitForNetworkIdle();
  await browser.close();

  return data;
};

export default fetchLecScheduleIfNeeded;
