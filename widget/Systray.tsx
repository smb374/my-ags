import Tray from "gi://AstalTray";
import { bind } from "astal";
import { App } from "astal/gtk3";

const tray = Tray.get_default();

export function Systray(): JSX.Element {

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
          return (
            <menubutton
              className="systray-item"
              tooltipMarkup={bind(item, "tooltipMarkup")}
              usePopover={false}
              menuModel={bind(item, "menuModel")}
              setup={self => {
                self.insert_action_group("dbusmenu", item.actionGroup);
                item.connect("changed", () => {
                  self.insert_action_group("dbusmenu", item.actionGroup);
                });
              }}
            >
              <icon className="systray-item-icon" gicon={bind(item, "gicon")} visible />
            </menubutton>
          );
        })
      )}
    </box>
  );
}
