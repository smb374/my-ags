import Tray from "gi://AstalTray";
import { bind } from "astal";
import Astal from "gi://Astal";
import { App, Gdk } from "astal/gtk3";

const tray = Tray.get_default();

export function Systray(): JSX.Element {
  const { PRIMARY, SECONDARY } = Astal.MouseButton;
  const { NORTH, SOUTH } = Gdk.Gravity;

  return (
    <box
      className="systray bar-item"
      visible={bind(tray, "items").as(items => items.filter(({ id }) => id !== null).length > 0)}
      spacing={5}
    >
      {bind(tray, "items").as(items =>
        items.filter(({ id }) => id !== null).map(item => {
          if (item.icon_theme_path) {
            App.add_icons(item.icon_theme_path);
          }
          const menu = item.create_menu();
          return (
            <button
              className="systray-item"
              cursor="pointer"
              onClick={(self, event) => {
                switch (event.button) {
                  case PRIMARY:
                    item.activate(event.x, event.y);
                    break;
                  case SECONDARY:
                    menu?.popup_at_widget(self, SOUTH, NORTH, null);
                    break;
                  default:
                    break;
                }
              }}
              onDestroy={() => menu?.destroy()}
              tooltip_markup={bind(item, "tooltip_markup")}
            >
              <icon className="systray-item-icon" g_icon={bind(item, "gicon")} visible />
            </button>
          );
        })
      )}
    </box>
  );
}
