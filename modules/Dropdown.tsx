import { bind, Binding, timeout, Variable } from "astal";
import { App, Astal, Gtk } from "astal/gtk3";
import Gdk from "gi://Gdk?version=3.0";
import { Window, WindowProps } from "astal/gtk3/widget";
import { global_evboxes, global_windows, update_variable } from "../utils";

const initRender = Variable(true);

timeout(2000, () => {
  initRender.set(false);
});

export type DropdownMenuProps = {
  name: string;
  child?: JSX.Element;
  layout?: string;
  transition?: Gtk.RevealerTransitionType | Binding<Gtk.RevealerTransitionType>;
  exclusivity?: Astal.Exclusivity;
  fixed?: boolean;
  setup?: (self: Window) => void,
} & WindowProps;


export function DropdownMenu({
  name,
  child,
  transition,
  exclusivity = Astal.Exclusivity.NORMAL,
  setup,
  ...props
}: DropdownMenuProps) {
  return (
    <window
      name={name}
      className={`${name} dropdown-menu`}
      exclusivity={exclusivity}
      layer={Astal.Layer.TOP}
      visible={bind(initRender)}
      keymode={Astal.Keymode.ON_DEMAND}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
      onKeyPressEvent={(self, event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
          self.hide();
        }
      }}
      application={App}
      focusVisible={false}
      focusOnMap={false}
      setup={self => {
        update_variable(global_windows, windows => {
          windows[name] = self;
          return windows;
        });
        setup?.(self);
      }}
      {...props}
    >
      <eventbox
        className="parent-event"
        setup={self => update_variable(global_evboxes, evboxes => {
          evboxes[name] = self;
          return evboxes;
        })}
      >
        <box>
          <box className="dropdown-menu-container">
            <revealer
              revealChild={false}
              transition_type={transition}
              transition_duration={200}
              setup={self => {
                App.connect("window-toggled", (_, window) => {
                  self.revealChild = window.name === name;
                })
              }}
            >
              <box>
                {child}
              </box>
            </revealer>
          </box>
        </box>
      </eventbox>
    </window>
  );
}
