import { bind, GLib, Variable } from "astal";
import { DropdownMenu } from "../modules/Dropdown";
import { astalify, Gtk } from "astal/gtk3";
import { open_menu } from "../utils";
import { CurrentWeather } from "../service/weather";
import { Weather } from "../service/weather/constants";
import { Scroller } from "../modules/Scroller";

const format = "%a %b %d  %H:%M:%S";
const date = Variable(GLib.DateTime.new_now_local())
  .poll(1000, () => GLib.DateTime.new_now_local());
const full_time = Variable.derive([date], t => t.format(format) || "");
const time = Variable.derive([date], t => t.format("%H:%M:%S") || "");

const Calendar = astalify(Gtk.Calendar);
const { START } = Gtk.Align;

function round2digits(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function WeatherInfo(): JSX.Element {
  return (
    <box hexpand>
      <box vertical hexpand>
        <label
          className="weather-info-text"
          halign={START}
          label={bind(CurrentWeather).as((w: Weather) => {
            return `\udb81\udd0f ${w.realtime.current.temp_c}\u00B0C`;
          })}
        />
        <label
          className="weather-info-text"
          halign={START}
          label={bind(CurrentWeather).as((w: Weather) => {
            return `\udb80\udf93 ${w.realtime.current.pressure_mb}mBar`;
          })}
        />
        <label
          className="weather-info-text"
          halign={START}
          label={bind(CurrentWeather).as((w: Weather) => {
            return `\udb85\uddfa ${w.realtime.current.wind_kph}km/h, ${w.realtime.current.wind_dir}`;
          })}
        />
      </box>
      <box vertical hexpand>
        <label
          className="weather-info-text"
          halign={START}
          label={bind(CurrentWeather).as((w: Weather) => {
            return `\udb81\udd8e ${w.realtime.current.humidity}%`;
          })}
        />
        <label
          className="weather-info-text"
          halign={START}
          label={bind(CurrentWeather).as((w: Weather) => {
            return `\udb80\uddab ${round2digits(w.realtime.current.precip_mm)}mm`;
          })}
        />
      </box>
    </box>
  );
}

function WeatherIcon(): JSX.Element {
  return (
    <box spacing={10}>
      <label
        className="weather-info-icon clock"
        label={bind(CurrentWeather).as((w: Weather) => w.icon.icon)} />
      <Scroller>
        <label
          className="weather-info-cond"
          hexpand
          halign={START}
          label={bind(CurrentWeather).as((w: Weather) => w.realtime.current.condition.text)} />
      </Scroller>
    </box>
  );
}

export function CalendarWindow(): JSX.Element {
  const { FILL } = Gtk.Align;
  let calendar = new Calendar({
    expand: true,
    halign: FILL,
    valign: FILL,
    showDayNames: true,
    showHeading: true,
    showDetails: false,
  });
  calendar.set_class_name("calendar-widget");
  return (
    <DropdownMenu name="calendar-window">
      <box className="container" hexpand vexpand vertical spacing={10}>
        <box className="section clock-item">
          <label
            className="clock-big clock"
            hexpand
            halign={FILL}
            label={bind(time)}
          />
        </box>
        <box className="section calendar-item">
          <box className="calendar-box">
            {calendar}
          </box>
        </box>
        <box className="section">
          <box className="weather-item" vertical spacing={10}>
            <WeatherIcon />
            <WeatherInfo />
          </box>
        </box>
      </box>
    </DropdownMenu>
  );
}

export function Clock(): JSX.Element {
  return (
    <button
      className="clock bar-item"
      onClicked={self => open_menu(self, "calendar-window")}
    >
      <box spacing={10}>
        <label className="bar-icon" label="󰸗" />
        <label
          className="clock-datetime"
          label={bind(full_time)}
        />
      </box>
    </button>
  );
}

