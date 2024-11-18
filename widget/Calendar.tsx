import { bind, GLib, Variable } from "astal";

const format = "%a %b %d  %I:%M:%S %p";
const date = Variable(GLib.DateTime.new_now_local())
  .poll(1000, () => GLib.DateTime.new_now_local());
const time = Variable.derive([date], t => t.format(format) || "");


export function Clock(): JSX.Element {
  return (
    <button className="clock bar-item">
      <box spacing={5}>
        <label className="clock-icon" label="󰸗" />
        <label
          className="clock-datetime"
          label={bind(time)}
        />
      </box>
    </button>
  );
}

