import AstalHyprland from "gi://AstalHyprland";
import { bind } from "astal";
import { Gdk } from "astal/gtk3";

const hyprland = AstalHyprland.get_default();

function ws_occupied(idx: number): boolean {
  const clients = hyprland.get_workspace(idx)?.get_clients();
  return (clients?.length ?? 0) !== 0;
}

function ws_class(idx: number, focused: AstalHyprland.Workspace = hyprland.focused_workspace,) {
  if (idx === focused.id) {
    return "focused";
  } else if (ws_occupied(idx)) {
    return "occupied";
  } else {
    return "blank";
  }
}

export function Workspace(): JSX.Element {
  return (
    <eventbox onScroll={(_, event) => {
      if (event.direction === Gdk.ScrollDirection.UP) {
        hyprland.dispatch("workspace", "+1");
      } else if (event.direction === Gdk.ScrollDirection.DOWN) {
        hyprland.dispatch("workspace", "-1");
      }
    }}>
      <box className="workspaces bar-item">
        {Array.from({ length: 6 }, (_, i) => i + 1).map(i => (
          <button
            className={bind(hyprland, "focused_workspace").as((ws) => ws_class(i, ws))}
            onClicked={() => hyprland.dispatch("workspace", `${i}`)}
            setup={(self) => {
              self.hook(hyprland, "client-added", (self) => self.className = ws_class(i))
              self.hook(hyprland, "client-removed", (self) => self.className = ws_class(i))
            }}
          >
            <label label={`${i}`} />
          </button>
        ))}
      </box>
    </eventbox>
  );
}
