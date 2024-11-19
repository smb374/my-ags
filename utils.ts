import { Button, EventBox, Window } from "astal/gtk3/widget";
import Hyprland from "gi://AstalHyprland?version=0.1";
import { Variable } from "astal";
import { App } from "astal/gtk3";

const hyprland = Hyprland.get_default();

export const global_evboxes: Variable<Record<string, EventBox>> = Variable({});
export const global_windows: Variable<Record<string, Window>> = Variable({});

export function pad_num(num: number, size: number, padding: string = '0'): string {
  return String(num).padStart(size, padding);
}

export function update_variable<T>(variable: Variable<T>, fn: (self: T) => T) {
  const val = variable.get();
  const nval = fn(val);
  variable.set(nval);
}

export function truncate(inp: string, max_size: number): string {
  return (max_size > 0 && inp.length > max_size) ? inp.substring(0, max_size) + '...' : inp;
}

export function open_menu(source: Button, window_name: string) {
  const allocation = source.get_allocation()
  const mid_button = Math.floor(allocation.width / 2);

  const pos = [allocation.x, mid_button];

  calculate_window_pos(pos, window_name);

  const windows = global_windows.get()
  for (const w in windows) {
    if (w !== window_name) {
      windows[w].hide();
    }
  }

  App.toggle_window(window_name);
}

export function calculate_window_pos(pos: number[], window_name: string) {
  const self = global_windows.get()[window_name];
  const evbox = global_evboxes.get()[window_name];
  const current_mon = hyprland.get_focused_monitor();
  const allocation = evbox.get_allocation();
  const dropdown_width = allocation.width;

  const hypr_scale = current_mon.scale;
  let mon_width = current_mon.width / hypr_scale;
  let mon_height = current_mon.height / hypr_scale;

  let margin_left = pos[0] - ((pos[0] + dropdown_width / 2) - (pos[0] + pos[1]));
  let margin_right = mon_width - dropdown_width - margin_left;

  const min_margin = 10;
  if (margin_left > pos[0]) {
    margin_left = pos[0];
    margin_right = mon_width - dropdown_width - margin_left;
  } else if (margin_left < min_margin) {
    margin_left = min_margin;
    margin_right = mon_width - dropdown_width - min_margin;
  }
  if (margin_right < min_margin || margin_left + dropdown_width > mon_width) {
    margin_right = min_margin;
    margin_left = mon_width - dropdown_width - min_margin;
  }

  self.set_margin_left(margin_left);
  self.set_margin_right(margin_right);
  self.set_margin_bottom(mon_height);
}
