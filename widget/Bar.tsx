import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Workspace } from "./Workspace";
import { WindowTitle } from "./WindowTitle";
import { Media } from "./Media";
import { Audio } from "./Audio";
import { Clock } from "./Calendar";
import { Systray } from "./Systray";
import { NetworkItem } from "./Network";

const seg_spacing = 5;

type Props = {
  child?: JSX.Element // when only one child is passed
  children?: Array<JSX.Element> // when multiple children are passed
}

function Left({ child, children }: Props): JSX.Element {
  return (
    <box className="segment" halign={Gtk.Align.START} spacing={seg_spacing}>
      {children ? children : (child ?? (<></>))}
    </box>
  );
}

function Center({ child, children }: Props): JSX.Element {
  return (
    <box className="segment" halign={Gtk.Align.CENTER} spacing={seg_spacing}>
      {children ? children : (child ?? (<></>))}
    </box>
  );
}

function Right({ child, children }: Props): JSX.Element {
  return (
    <box className="segment" halign={Gtk.Align.END} spacing={seg_spacing}>
      {children ? children : (child ?? (<></>))}
    </box>
  );
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
  return <window
    className="bar"
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={Astal.WindowAnchor.TOP
      | Astal.WindowAnchor.LEFT
      | Astal.WindowAnchor.RIGHT}
    layer={Astal.Layer.BOTTOM}
    application={App}>
    <centerbox className="container">
      <Left>
        <Workspace />
        <WindowTitle />
      </Left>
      <Center>
        <Media />
      </Center>
      <Right>
        <Audio />
        <NetworkItem />
        <Systray />
        <Clock />
      </Right>
    </centerbox>
  </window>
}
