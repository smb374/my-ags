/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Search {
  /**
   * @format int32
   * @example 2796590
   */
  id: number;
  /** @example "Holborn" */
  name: string;
  /** @example "Camden Greater London" */
  region: string;
  /** @example "United Kingdom" */
  country: string;
  /** @example 51.52 */
  lat: number;
  /** @example -0.12 */
  lon: number;
  /** @example "holborn-camden-greater-london-united-kingdom" */
  url: string;
}

export type ArrayOfSearch = Search[];

export interface Location {
  /** @example "New York" */
  name: string;
  /** @example "New York" */
  region: string;
  /** @example "United States of America" */
  country: string;
  /** @example 40.71 */
  lat: number;
  /** @example -74.01 */
  lon: number;
  /** @example "America/New_York" */
  tz_id: string;
  /**
   * @format int32
   * @example 1658522976
   */
  localtime_epoch: number;
  /** @example "2022-07-22 16:49" */
  localtime: string;
}

export interface Current {
  /**
   * @format int32
   * @example 1658522700
   */
  last_updated_epoch: number;
  /** @example "2022-07-22 16:45" */
  last_updated: string;
  /** @example 34.4 */
  temp_c: number;
  /** @example 93.9 */
  temp_f: number;
  /**
   * @format int32
   * @example 1
   */
  is_day: number;
  condition: {
    /** @example "Partly cloudy" */
    text: string;
    /** @example "//cdn.weatherapi.com/weather/64x64/day/116.png" */
    icon: string;
    /**
     * @format int32
     * @example 1003
     */
    code: number;
  };
  /** @example 16.1 */
  wind_mph: number;
  /** @example 25.9 */
  wind_kph: number;
  /** @example 180 */
  wind_degree: number;
  /** @example "S" */
  wind_dir: string;
  /** @example 1011 */
  pressure_mb: number;
  /** @example 29.85 */
  pressure_in: number;
  /** @example 0 */
  precip_mm: number;
  /** @example 0 */
  precip_in: number;
  /** @example 31 */
  humidity: number;
  /** @example 75 */
  cloud: number;
  /** @example 37 */
  feelslike_c: number;
  /** @example 98.6 */
  feelslike_f: number;
  /** @example 16 */
  vis_km: number;
  /** @example 9 */
  vis_miles: number;
  /**
   * @format int32
   * @example 8
   */
  uv: number;
  /** @example 11.6 */
  gust_mph: number;
  /** @example 18.7 */
  gust_kph: number;
  air_quality: {
    /** @example 293.70001220703125 */
    co: number;
    /** @example 18.5 */
    no2: number;
    /** @example 234.60000610351562 */
    o3: number;
    /** @example 12 */
    so2: number;
    /** @example 13.600000381469727 */
    pm2_5: number;
    /** @example 15 */
    pm10: number;
    /**
     * @format int32
     * @example 1
     */
    "us-epa-index": number;
    /**
     * @format int32
     * @example 2
     */
    "gb-defra-index": number;
  };
}

export interface Forecast {
  forecastday: {
    /**
     * @format date
     * @example "2024-06-04T12:26:04.995Z"
     */
    date: string;
    /**
     * @format int32
     * @example 1658448000
     */
    date_epoch: number;
    day: {
      /** @example 35.9 */
      maxtemp_c: number;
      /** @example 96.6 */
      maxtemp_f: number;
      /** @example 26.3 */
      mintemp_c: number;
      /** @example 79.3 */
      mintemp_f: number;
      /** @example 30.7 */
      avgtemp_c: number;
      /** @example 87.3 */
      avgtemp_f: number;
      /** @example 12.8 */
      maxwind_mph: number;
      /** @example 20.5 */
      maxwind_kph: number;
      /** @example 0 */
      totalprecip_mm: number;
      /** @example 0 */
      totalprecip_in: number;
      /** @example 10 */
      avgvis_km: number;
      /** @example 6 */
      avgvis_miles: number;
      /** @example 53 */
      avghumidity: number;
      /**
       * @format int32
       * @example 0
       */
      daily_will_it_rain: number;
      /** @example 0 */
      daily_chance_of_rain: number;
      /**
       * @format int32
       * @example 0
       */
      daily_will_it_snow: number;
      /** @example 0 */
      daily_chance_of_snow: number;
      condition: {
        /** @example "Sunny" */
        text: string;
        /** @example "//cdn.weatherapi.com/weather/64x64/day/113.png" */
        icon: string;
        /**
         * @format int32
         * @example 1000
         */
        code: number;
      };
      /**
       * @format int32
       * @example 8
       */
      uv: number;
    };
    astro: {
      /** @example "05:44 AM" */
      sunrise: string;
      /** @example "08:20 PM" */
      sunset: string;
      /** @example "12:58 AM" */
      moonrise: string;
      /** @example "03:35 PM" */
      moonset: string;
      /** @example "Last Quarter" */
      moon_phase: string;
      /** @example 36 */
      moon_illumination: string;
    };
    hour: {
      /**
       * @format int32
       * @example 1658462400
       */
      time_epoch: number;
      /** @example "2022-07-22 00:00" */
      time: string;
      /** @example 28.7 */
      temp_c: number;
      /** @example 83.7 */
      temp_f: number;
      /**
       * @format int32
       * @example 0
       */
      is_day: number;
      condition: {
        /** @example "Clear" */
        text: string;
        /** @example "//cdn.weatherapi.com/weather/64x64/night/113.png" */
        icon: string;
        /**
         * @format int32
         * @example 1000
         */
        code: number;
      };
      /** @example 9.4 */
      wind_mph: number;
      /** @example 15.1 */
      wind_kph: number;
      /** @example 265 */
      wind_degree: number;
      /** @example "W" */
      wind_dir: string;
      /** @example 1007 */
      pressure_mb: number;
      /** @example 29.73 */
      pressure_in: number;
      /** @example 0 */
      precip_mm: number;
      /** @example 0 */
      precip_in: number;
      /** @example 58 */
      humidity: number;
      /** @example 19 */
      cloud: number;
      /** @example 30.5 */
      feelslike_c: number;
      /** @example 86.9 */
      feelslike_f: number;
      /** @example 28.7 */
      windchill_c: number;
      /** @example 83.7 */
      windchill_f: number;
      /** @example 30.5 */
      heatindex_c: number;
      /** @example 86.9 */
      heatindex_f: number;
      /** @example 19.6 */
      dewpoint_c: number;
      /** @example 67.3 */
      dewpoint_f: number;
      /**
       * @format int32
       * @example 0
       */
      will_it_rain: number;
      /** @example 0 */
      chance_of_rain: number;
      /**
       * @format int32
       * @example 0
       */
      will_it_snow: number;
      /** @example 0 */
      chance_of_snow: number;
      /** @example 10 */
      vis_km: number;
      /** @example 6 */
      vis_miles: number;
      /** @example 15 */
      gust_mph: number;
      /** @example 24.1 */
      gust_kph: number;
      /**
       * @format int32
       * @example 1
       */
      uv: number;
    }[];
  }[];
}

export interface Marine {
  forecastday: {
    /**
     * @format date
     * @example "2024-06-04T12:26:04.995Z"
     */
    date: string;
    /**
     * @format int32
     * @example 1658448000
     */
    date_epoch: number;
    day: {
      /** @example 35.9 */
      maxtemp_c: number;
      /** @example 96.6 */
      maxtemp_f: number;
      /** @example 26.3 */
      mintemp_c: number;
      /** @example 79.3 */
      mintemp_f: number;
      /** @example 30.7 */
      avgtemp_c: number;
      /** @example 87.3 */
      avgtemp_f: number;
      /** @example 12.8 */
      maxwind_mph: number;
      /** @example 20.5 */
      maxwind_kph: number;
      /** @example 0 */
      totalprecip_mm: number;
      /** @example 0 */
      totalprecip_in: number;
      /** @example 10 */
      avgvis_km: number;
      /** @example 6 */
      avgvis_miles: number;
      /** @example 53 */
      avghumidity: number;
      /**
       * @format int32
       * @example 0
       */
      daily_will_it_rain: number;
      /** @example 0 */
      daily_chance_of_rain: number;
      /**
       * @format int32
       * @example 0
       */
      daily_will_it_snow: number;
      /** @example 0 */
      daily_chance_of_snow: number;
      condition: {
        /** @example "Sunny" */
        text: string;
        /** @example "//cdn.weatherapi.com/weather/64x64/day/113.png" */
        icon: string;
        /**
         * @format int32
         * @example 1000
         */
        code: number;
      };
      /**
       * @format int32
       * @example 8
       */
      uv: number;
    };
    astro: {
      /** @example "05:44 AM" */
      sunrise: string;
      /** @example "08:20 PM" */
      sunset: string;
      /** @example "12:58 AM" */
      moonrise: string;
      /** @example "03:35 PM" */
      moonset: string;
      /** @example "Last Quarter" */
      moon_phase: string;
      /** @example 36 */
      moon_illumination: string;
    };
    hour: {
      /**
       * @format int32
       * @example 1658462400
       */
      time_epoch: number;
      /** @example "2022-07-22 00:00" */
      time: string;
      /** @example 28.7 */
      temp_c: number;
      /** @example 83.7 */
      temp_f: number;
      /**
       * @format int32
       * @example 0
       */
      is_day: number;
      condition: {
        /** @example "Clear" */
        text: string;
        /** @example "//cdn.weatherapi.com/weather/64x64/night/113.png" */
        icon: string;
        /**
         * @format int32
         * @example 1000
         */
        code: number;
      };
      /** @example 9.4 */
      wind_mph: number;
      /** @example 15.1 */
      wind_kph: number;
      /** @example 265 */
      wind_degree: number;
      /** @example "W" */
      wind_dir: string;
      /** @example 1007 */
      pressure_mb: number;
      /** @example 29.73 */
      pressure_in: number;
      /** @example 0 */
      precip_mm: number;
      /** @example 0 */
      precip_in: number;
      /** @example 58 */
      humidity: number;
      /** @example 19 */
      cloud: number;
      /** @example 30.5 */
      feelslike_c: number;
      /** @example 86.9 */
      feelslike_f: number;
      /** @example 28.7 */
      windchill_c: number;
      /** @example 83.7 */
      windchill_f: number;
      /** @example 30.5 */
      heatindex_c: number;
      /** @example 86.9 */
      heatindex_f: number;
      /** @example 19.6 */
      dewpoint_c: number;
      /** @example 67.3 */
      dewpoint_f: number;
      /**
       * @format int32
       * @example 0
       */
      will_it_rain: number;
      /** @example 0 */
      chance_of_rain: number;
      /**
       * @format int32
       * @example 0
       */
      will_it_snow: number;
      /** @example 0 */
      chance_of_snow: number;
      /** @example 10 */
      vis_km: number;
      /** @example 6 */
      vis_miles: number;
      /** @example 15 */
      gust_mph: number;
      /** @example 24.1 */
      gust_kph: number;
      /** @example 24.1 */
      sig_ht_mt: number;
      /** @example 24.1 */
      swell_ht_mt: number;
      /** @example 24.1 */
      swell_ht_ft: number;
      /** @example 24.1 */
      swell_dir: number;
      /** @example 24.1 */
      swell_dir_16_point: number;
      /** @example 24.1 */
      swell_period_secs: number;
      /**
       * @format int32
       * @example 1
       */
      uv: number;
    }[];
  }[];
}

export interface Alerts {
  alert: {
    /** @example "NWS New York City - Upton (Long Island and New York City)" */
    headline: string;
    /** @example null */
    msgtype: string;
    /** @example null */
    severity: string;
    /** @example null */
    urgency: string;
    /** @example null */
    areas: string;
    /** @example "Extreme temperature value" */
    category: string;
    /** @example null */
    certainty: string;
    /** @example "Heat Advisory" */
    event: string;
    /** @example null */
    note: string;
    /**
     * @format date-time
     * @example "2024-06-04T12:26:04.996Z"
     */
    effective: string;
    /**
     * @format date-time
     * @example "2024-06-04T12:26:04.996Z"
     */
    expires: string;
    /** @example "...HEAT ADVISORY REMAINS IN EFFECT UNTIL 8 PM EDT SUNDAY... * WHAT...Heat index values up to 105. * WHERE...Eastern Passaic Hudson Western Bergen Western Essex Eastern Bergen and Eastern Essex Counties. * WHEN...Until 8 PM EDT Sunday. * IMPACTS...High temperatures and high humidity may cause heat illnesses to occur." */
    desc: string;
    /** @example "" */
    instruction: string;
  }[];
}

export interface Ip {
  /** @example "185.249.71.82" */
  ip: string;
  /** @example "ipv4" */
  type: string;
  /** @example "EU" */
  continent_code: string;
  /** @example "Europe" */
  continent_name: string;
  /** @example "GB" */
  country_code: string;
  /** @example "United Kingdom" */
  country_name: string;
  /** @example false */
  is_eu: string;
  /**
   * @format int32
   * @example 2643743
   */
  geoname_id: number;
  /** @example "London" */
  city: string;
  /** @example null */
  region: string;
  /** @example 51.5264 */
  lat: number;
  /** @example -0.0841 */
  lon: number;
  /** @example "Europe/London" */
  tz_id: string;
  /**
   * @format int32
   * @example 1658520645
   */
  localtime_epoch: number;
  /** @example "2022-07-22 21:10" */
  localtime: string;
}

export interface Astronomy {
  astro: {
    /** @example "05:10 AM" */
    sunrise: string;
    /** @example "09:03 PM" */
    sunset: string;
    /** @example "12:29 AM" */
    moonrise: string;
    /** @example "04:01 PM" */
    moonset: string;
    /** @example "Third Quarter" */
    moon_phase: string;
    /** @example 42 */
    moon_illumination: string;
  };
}

export interface Error400 {
  /**
   * @format int32
   * @example 1003
   */
  code: number;
  /** @example "Parameter 'q' not provided." */
  message: string;
}

export interface Error401 {
  /**
   * @format int32
   * @example 1002
   */
  code: number;
  /** @example "API key not provided" */
  message: string;
}

export interface Error403 {
  /**
   * @format int32
   * @example 2007
   */
  code: number;
  /** @example "API key has exceeded calls per month quota." */
  message: string;
}

