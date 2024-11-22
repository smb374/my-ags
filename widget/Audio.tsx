import WirePlumber from "gi://AstalWp";
import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { DropdownMenu } from "../modules/Dropdown";
import { open_menu, truncate, update_variable, pad_num } from "../utils";

const wireplumber = WirePlumber.get_default();
const current_endpoints: Variable<WirePlumber.Endpoint[]> = Variable([]);
const default_speaker: Variable<WirePlumber.Endpoint | null> = Variable(null);
const default_microphone: Variable<WirePlumber.Endpoint | null> = Variable(null);
const input_icons: Record<number, string> = {
  101: 'microphone-sensitivity-high-symbolic',
  66: 'microphone-sensitivity-high-symbolic',
  34: 'microphone-sensitivity-medium-symbolic',
  1: 'microphone-sensitivity-low-symbolic',
  0: 'microphone-disabled-symbolic',
};
const speaker_icons: Record<number, string> = {
  101: 'audio-volume-overamplified-symbolic',
  66: 'audio-volume-high-symbolic',
  34: 'audio-volume-medium-symbolic',
  1: 'audio-volume-low-symbolic',
  0: 'audio-volume-muted-symbolic',
};

function update_default_speaker() {
  const speaker = wireplumber?.get_default_speaker();
  if (speaker) {
    default_speaker.set(speaker);
  }
}

function update_default_microphone() {
  const microphone = wireplumber?.get_default_microphone();
  if (microphone) {
    default_microphone.set(microphone);
  }
}

function update_endpoints() {
  const endpoints = wireplumber?.get_endpoints();
  if (endpoints) {
    current_endpoints.set(endpoints);
  }
}

function update_wp() {
  update_default_speaker();
  update_default_microphone();
  update_endpoints();
}

function volume_item_icon(endpoint: WirePlumber.Endpoint | null, is_input: boolean) {
  const thresholds = [101, 66, 34, 1, 0];
  const icon_set = is_input ? input_icons : speaker_icons;
  if (!endpoint) {
    return icon_set[0];
  }
  const key = endpoint.mute ? 0 : thresholds.find(t => t <= endpoint.volume * 100) || 0;
  return icon_set[key];
}

function VolumeItem(props: { microphone?: boolean }): JSX.Element {
  const { START, END, FILL } = Gtk.Align;
  const flag = props.microphone ?? false;
  const endpoint = flag ? default_microphone : default_speaker;
  const current_state = Variable({
    icon: volume_item_icon(endpoint.get(), flag),
    name: "Unknown",
    volume: 0,
    mute: false,
  });

  const update_state = (e: WirePlumber.Endpoint) =>
    update_variable(current_state, (_) => {
      // NOTE: Need a new instance, otherwise won't trigger.
      return {
        icon: volume_item_icon(e, flag),
        name: e.description ?? `No ${flag ? "input" : "playback"} device found...`,
        volume: e.volume,
        mute: e.mute,
      };
    });

  update_variable(endpoint, ep => {
    if (ep) {
      update_state(ep);
      ep.connect("notify", () => update_state(ep));
    }
    return ep;
  });

  return (
    <box className="volume-item-container" vexpand spacing={10}>
      <button
        className="volume-item-toggle"
        onClicked={() => {
          const e = endpoint.get();
          if (e) {
            e.mute = !e.mute;
          }
        }}
      >
        <icon
          className="volume-item-icon"
          valign={END}
          icon={bind(current_state).as(({ icon }) => icon)}
        />
      </button>
      <box className="volume-item-slider-container" halign={FILL} vertical hexpand>
        <label
          halign={START}
          className="volume-item-slider-tag"
          label={bind(current_state).as(({ name }) => truncate(name, 30))} />
        <box halign={FILL} hexpand spacing={10}>
          <slider
            halign={FILL}
            className="volume-item-slider"
            onDragged={({ value }) => {
              const ep = endpoint.get();
              if (ep) {
                ep.set_volume(value);
              }
            }}
            hexpand
            value={bind(current_state).as(({ volume }) => volume)} />
          <box halign={FILL} hexpand />
          <label halign={END} label={bind(current_state).as(({ volume }) => `${pad_num(Math.floor(volume * 100), 3, ' ')}%`)} />
        </box>
      </box>
    </box>
  );
}

function SectionList(props: { microphone?: boolean }): JSX.Element {
  const { START } = Gtk.Align;
  const { AUDIO_SPEAKER, AUDIO_MICROPHONE } = WirePlumber.MediaClass;

  const flag = props.microphone ?? false;
  const filterf = (e: WirePlumber.Endpoint) =>
    flag ? (e.media_class === AUDIO_MICROPHONE)
      : (e.media_class === AUDIO_SPEAKER);

  return (
    <box className="audio-section-list-container" vertical spacing={10}>
      <label className="section-tag audio" halign={START} hexpand label={`${flag ? "Input" : "Playback"} Endpoints`} />
      <box className="audio-section-list" vertical spacing={5}>
        {bind(current_endpoints).as(eps => {
          const widgets = eps.filter(filterf).sort((a, b) => b.id - a.id).map(ep => (
            <button
              className="audio-section-list-toggle"
              onClicked={() => {
                ep.set_is_default(true);
              }}
            >
              <box halign={START} className="audio-section-list-item" spacing={10}>
                <icon
                  icon={flag ? "microphone-sensitivity-high-symbolic" : "audio-volume-high-symbolic"}
                  className={(() => {
                    const endpoint = flag ? default_microphone : default_speaker;
                    const e = endpoint.get();
                    return e
                      ? bind(e, "id").as(id => id === ep.id
                        ? "audio-section-list-item-icon active"
                        : "audio-section-list-item-icon")
                      : "audio-section-list-item-icon";
                  })()}
                />
                <label
                  className="audio-section-item-label"
                  halign={START}
                  label={truncate(ep.description, 30)} />
              </box>
            </button>
          ));
          return widgets.length > 0
            ? widgets
            : (<label halign={START} label={`No ${flag ? "input" : "playback"} device found...`} />);
        })}
      </box>
    </box>
  );
}

export function AudioWindow(): JSX.Element {
  const { START } = Gtk.Align;
  return (
    <DropdownMenu name="audio-window">
      <box className="container" hexpand vexpand vertical spacing={10}>
        <box className="section" vertical hexpand>
          <label className="section-tag audio" halign={START} hexpand label="Volume" />
          <VolumeItem />
          <VolumeItem microphone />
        </box>
        <box className="section" vertical hexpand spacing={20}>
          <SectionList />
          <SectionList microphone />
        </box>
      </box>
    </DropdownMenu>
  );
}

export function Audio(): JSX.Element {
  update_wp();
  ["endpoint-added", "endpoint-removed"].forEach((signal) => {
    wireplumber?.connect(signal, () => update_wp());
  });
  const state = Variable({ icon: volume_item_icon(null, false), volume: 0 });
  const endpoint = default_speaker.get();
  if (endpoint) {
    update_variable(
      state,
      () => ({ icon: volume_item_icon(endpoint, false), volume: endpoint.volume })
    );
    endpoint.connect("notify",
      () => update_variable(
        state,
        () => ({ icon: volume_item_icon(endpoint, false), volume: endpoint.volume })
      ));
  }
  return (
    <button className="audio bar-item" onClick={(self) => open_menu(self, "audio-window")}>
      <box spacing={10}>
        <icon icon={bind(state).as(s => s.icon)} />
        <label
          label={bind(state).as(s => `${Math.round(s.volume * 100)}%`)}
        />
      </box>
    </button>
  );
}
