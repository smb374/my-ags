import Network from "gi://AstalNetwork";
import { bind, Variable } from "astal";
import { open_menu, truncate } from "../utils";
import { DropdownMenu } from "../modules/Dropdown";
import { Gtk } from "astal/gtk3";
import NM from "gi://NM?version=1.0";

type PrimaryNetwork = Network.Wired | Network.Wifi;
const { START, FILL, END } = Gtk.Align;
const { CONNECTED, CONNECTING, DISCONNECTED } = Network.Internet;
const { UNKNOWN } = Network.DeviceState;

const network = Network.get_default();
const primary_network: Variable<PrimaryNetwork> = Variable(get_primary());
const primary_icon: Variable<string> = Variable("");
const wired_internet: Variable<Network.Internet> = Variable(Network.Internet.DISCONNECTED);
const wired_icon_name: Variable<string> = Variable("network-wired-disconnected-symbolic");

function get_primary() {
  const primary = network.primary;
  if (primary === Network.Primary.WIFI) {
    return network.wifi;
  } else {
    return network.wired;
  }
}

function update_primary() {
  const primary = network.primary;
  if (primary === Network.Primary.WIFI) {
    primary_network.set(network.wifi);
    primary_icon.set(network.wifi.icon_name);
  } else {
    primary_network.set(network.wired);
    primary_icon.set(get_wired_icon_name(network.wired.device, get_wired_state(network.wired.device)));
  }
}

function get_wired_state(device: NM.Device | null): Network.Internet {
  if (device == null || device.active_connection == null) {
    return DISCONNECTED;
  }

  switch (device.active_connection.state) {
    case NM.ActiveConnectionState.ACTIVATED: return CONNECTED;
    case NM.ActiveConnectionState.ACTIVATING: return CONNECTING;
    default: return DISCONNECTED;
  }
}

function get_wired_icon_name(device: NM.Device, internet: Network.Internet) {
  const full = device.client.connectivity == NM.ConnectivityState.FULL;

  if (internet == Network.Internet.CONNECTING) {
    return "network-wired-acquiring-symbolic";
  }

  if (internet == Network.Internet.CONNECTED) {
    if (!full) return "network-wired-no-route-symbolic";

    return "network-wired-symbolic";
  }

  return "network-wired-disconnected-symbolic";
}

function update_wired() {
  const internet = get_wired_state(network.wired.device);
  const icon_name = get_wired_icon_name(network.wired.device, internet);
  wired_internet.set(internet);
  wired_icon_name.set(icon_name);
}

function get_primary_label(nw: PrimaryNetwork | null): string {
  if (!nw) {
    return "--";
  }
  if ("ssid" in nw) {
    return nw.ssid.substring(0, 7);
  } else {
    return "Wired";
  }
}

function internet_to_string(internet: Network.Internet) {
  switch (internet) {
    case Network.Internet.CONNECTED: return "Connected";
    case Network.Internet.CONNECTING: return "Connecting";
    case Network.Internet.DISCONNECTED: return "Disconnected";
  }
}

function EthernetSection(): JSX.Element {
  const wired = network.wired;
  return (
    <box className="section" hexpand vertical spacing={10}>
      <label
        className="section-tag network"
        halign={START}
        label="Ethernet" />
      <box className="network-item" halign={START} spacing={10}>
        <icon
          className={bind(wired_internet).as(s => `network-icon ${s === CONNECTED ? "active" : ""}`)}
          icon={bind(wired_icon_name)}
        />
        <box vertical>
          <label
            halign={START}
            label={bind(wired, "state").as(s =>
              `Ethernet Connection (${s !== UNKNOWN ? wired.speed / 1000 : -1} Gbps)`
            )}
          />
          <label
            className="connection-status"
            halign={START}
            label={bind(wired_internet).as(internet_to_string)} />
        </box>
      </box>
    </box>
  );
}

function WifiSection(): JSX.Element {
  const wifi = network.wifi;
  return (
    <box className="section" hexpand vertical spacing={10}>
      <box className="section-header" halign={FILL} hexpand spacing={10}>
        <label
          className="section-tag network"
          halign={START}
          hexpand
          label="Wi-Fi" />
        <switch
          className="menu-switch network"
          halign={END}
          hexpand
        />
      </box>
      <box className="network-item staging" halign={FILL} spacing={10}>
        <icon
          className="network-icon active"
          halign={START}
          icon={bind(wifi, "activeAccessPoint").as(ap => ap.icon_name)}
        />
        <label
          className="wifi-ssid-label"
          halign={START}
          hexpand
          label={bind(wifi, "active_access_point").as(ap => truncate(ap.ssid, 12))}
        />
      </box>
    </box>
  );
}

export function NetworkWindow(): JSX.Element {
  return (
    <DropdownMenu name="network-window">
      <box className="container" vexpand hexpand vertical spacing={10}>
        <EthernetSection />
        <WifiSection />
      </box>
    </DropdownMenu>
  );
}

export function NetworkItem(): JSX.Element {
  update_primary();
  update_wired();
  network.connect("notify", () => {
    update_primary();
    update_wired();
  });
  return (
    <button
      className="network bar-item"
      onClick={(self) => open_menu(self, "network-window")}
    >
      <box spacing={5}>
        <icon icon={bind(primary_icon).as(s => s ?? "connected-squares-x")} />
        <label className="network-label" label={bind(primary_network).as(get_primary_label)} />
      </box>
    </button>
  );
}
