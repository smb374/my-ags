import Gtk from "gi://Gtk?version=3.0";
import { Box, Button } from "astal/gtk3/widget";
import Gdk from "gi://Gdk?version=3.0";

export type Transition = 'none' | 'crossfade' | 'slide_right' | 'slide_left' | 'slide_up' | 'slide_down';

export type Layouts =
  | 'center'
  | 'top'
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type Attribute = unknown;
export type Child = Gtk.Widget;
export type GtkWidget = Gtk.Widget;
export type BoxWidget = Box;

export type GButton = Gtk.Button;
export type GBox = Gtk.Box;
export type GLabel = Gtk.Label;
export type GCenterBox = Gtk.Box;

export type EventHandler<Self> = (self: Self, event: Gdk.Event) => boolean | unknown;
export type EventArgs = { clicked: Button; event: Gdk.Event };
