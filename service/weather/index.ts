import { execAsync, interval, readFileAsync, Variable } from "astal";
import { Error400, Error401, Error403 } from "./api";
import { DEFAULT_WEATHER, RealTime, Weather, WEATHER_CODES } from "./constants";

const API_KEY_LOCATION = "weather_api_key";
const api_key: Variable<string | undefined> = Variable(undefined);

export const CurrentWeather: Variable<Weather> = Variable({
  realtime: DEFAULT_WEATHER,
  icon: get_icon(DEFAULT_WEATHER),
});


async function read_api_key(): Promise<string | undefined> {
  let key = await readFileAsync(API_KEY_LOCATION)
    .catch(err => {
      console.error(`Failed to read weather api key: ${err}`);
      return undefined;
    });
  if (key && key.length === 0) {
    key = undefined;
  }
  return key?.trim();
}

function get_icon(realtime: RealTime | undefined) {
  if (realtime != undefined) {
    let current = realtime.current;
    if (WEATHER_CODES?.[current.condition.code] !== undefined) {
      if (current.is_day === 1) {
        return WEATHER_CODES[current.condition.code].day;
      } else {
        return WEATHER_CODES[current.condition.code].night;
      }
    } else {
      return {
        description: "unknown code",
        icon: "\ue36e", // 
      };
    }
  } else {
    return {
      description: "Uninitialized",
      icon: "\ue374", // 
    };
  }
}

async function get_current_weather() {
  let key = api_key.get();
  if (!key) {
    key = await read_api_key();
    if (key) {
      api_key.set(key);
    } else {
      return;
    }
  }

  const resp = await execAsync(`curl 'https://api.weatherapi.com/v1/current.json?q=auto:ip&key=${key}'`);
  const body = JSON.parse(resp);
  if (body?.["location"]) {
    const rt = body as RealTime;
    CurrentWeather.set({
      realtime: rt,
      icon: get_icon(rt),
    });
  } else {
    console.error(`Failed to fetch: ${body}`);
  }
}

interval(1000, async () => {
  // TODO: Update Current Weather.
  get_current_weather().catch(err => console.error(err));
});
