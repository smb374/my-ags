import { Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { bind, execAsync, Variable } from "astal";
import { open_menu, truncate } from "../utils";
import { DropdownMenu } from "../modules/Dropdown";
import { Scroller } from "../modules/Scroller";

const basePixel = 160;
const mpris = Mpris.get_default();
const current_player = Variable(mpris.get_players()[0]);
const current_cover = Variable({ path: "", adjw: basePixel });
const current_info = Variable({ icon: "󰝚", title: "---", artist: "---", album: "---" });
const current_player_idx = Variable(0);

function get_icon_for_player(playerName: string): string {
  const windowTitleMap = [
    ['Firefox', '󰈹'],
    ['Microsoft Edge', '󰇩'],
    ['Discord', ''],
    ['Plex', '󰚺'],
    ['Spotify', '󰓇'],
    ['Vlc', '󰕼'],
    ['Mpv', ''],
    ['Rhythmbox', '󰓃'],
    ['Google Chrome', ''],
    ['Brave Browser', '󰖟'],
    ['Chromium', ''],
    ['Opera', ''],
    ['Vivaldi', '󰖟'],
    ['Waterfox', '󰈹'],
    ['Thorium', '󰈹'],
    ['Zen Browser', '󰈹'],
    ['Floorp', '󰈹'],
    ['(.*)', '󰝚'],
  ];

  const foundMatch = windowTitleMap.find((wt) => RegExp(wt[0], 'i').test(playerName));

  return foundMatch ? foundMatch[1] : '󰝚';
}

function get_current_player(): Mpris.Player {
  const idx = current_player_idx.get();
  const players = mpris.get_players();
  const nidx = idx % players.length;
  current_player_idx.set(nidx);
  return players[nidx];
}

async function calculate_img_width(path: string): Promise<number> {
  try {
    const result = await execAsync(`sh -c "identify '${path}' | awk -F' ' '{print $(NF-6);}' | awk -F'x' '{print $1/$2 * ${basePixel}}'"`);
    const val = parseFloat(result);
    return val;
  } catch {
    return basePixel;
  }
}

function update_cover(player: Mpris.Player) {
  calculate_img_width(player.cover_art).then(adjw => {
    current_cover.set({ path: player.cover_art, adjw });
  });
}

function update_info(player: Mpris.Player) {
  current_info.set({
    icon: get_icon_for_player(player.identity),
    title: player.title || "---",
    artist: player.artist || "---",
    album: player.album || "---",
  });
}

function update_current_player(_player: Mpris.Player) {
  const p = get_current_player();
  update_info(p);
  update_cover(p);
  current_player.set(p);
}

function next_player() {
  const players = mpris.get_players();
  const idx = current_player_idx.get();
  if (players.length === 0) {
    return;
  }
  const nidx = (idx + 1) % players.length;
  const p = players[nidx];
  update_info(p);
  update_cover(p);
  current_player.set(p);
  current_player_idx.set(nidx);
}

function prev_player() {
  const players = mpris.get_players();
  const idx = current_player_idx.get();
  if (players.length === 0) {
    return;
  }
  const nidx = (idx - 1 + players.length) % players.length;
  const p = players[nidx];
  update_info(p);
  update_cover(p);
  current_player.set(p);
  current_player_idx.set(nidx);
}

function length_str(length: number) {
  const min = Math.floor(length / 60)
  const sec = Math.floor(length % 60)
  const sec0 = sec < 10 ? "0" : ""
  return `${min}:${sec0}${sec}`
}

function MediaPlayer({ player }: { player: Mpris.Player }): JSX.Element {
  const { START, CENTER, FILL, END } = Gtk.Align;
  update_info(player);
  update_cover(player);
  return (
    <box className="media-player" vertical vexpand spacing={5}>
      <box spacing={10}>
        <box className="media-art" halign={CENTER} css={bind(current_cover).as(({ path, adjw }) => {
          return `background-image: url('${path}'); min-width: ${adjw}px; min-height: ${basePixel}px`
        })} />
        <box className="media-info" vertical halign={FILL}>
          <Scroller>
            <label className="media-title" halign={START} label={bind(current_info).as(({ title }) => title)} hexpand />
          </Scroller>
          <Scroller>
            <label className="media-artist" halign={START} label={bind(current_info).as(({ artist }) => artist)} hexpand />
          </Scroller>
          <Scroller>
            <label className="media-album" halign={START} label={bind(current_info).as(({ album }) => album)} hexpand />
          </Scroller>
        </box>
      </box>
      <slider
        className="media-slider"
        visible={bind(player, "length").as(l => l > 0)}
        onDragged={({ value }) => player.position = value * player.length}
        value={bind(player, "position").as(p => player.length > 0 ? p / player.length : 0)} />
      <box className="media-control" valign={END} spacing={10}>
        <label
          hexpand
          halign={START}
          className="media-length"
          visible={bind(player, "length").as(l => l > 0)}
          label={bind(player, "position").as(length_str)}
        />
        <box className="media-control" spacing={10} halign={CENTER} hexpand>
          <button
            halign={START}
            className="media-control-butn"
            onClicked={() => prev_player()}>
            <label className="media-control-icon" label={"\udb80\udd41"} />
          </button>
          <button
            halign={START}
            className="media-control-butn"
            onClicked={() => player.previous()}
            visible={bind(player, "canGoPrevious")}>
            <label className="media-control-icon" label={"\udb81\udcae"} />
          </button>
          <button
            halign={CENTER}
            className="media-control-butn"
            onClicked={() => player.play_pause()}
            visible={bind(player, "canControl")}>
            <label className="media-control-icon" label={bind(player, "playback_status").as((s) =>
              s === Mpris.PlaybackStatus.PLAYING ? "\udb80\udfe4" : "\udb81\udc0a"
            )} />
          </button>
          <button
            halign={END}
            className="media-control-butn"
            onClicked={() => player.next()}
            visible={bind(player, "canGoNext")}>
            <label className="media-control-icon" label={"\udb81\udcad"} />
          </button>
          <button
            halign={END}
            className="media-control-butn"
            onClicked={() => next_player()}>
            <label className="media-control-icon" label={"\udb80\udd42"} />
          </button>
        </box>
        <label
          hexpand
          halign={END}
          className="media-length"
          visible={bind(player, "length").as(l => l > 0)}
          label={bind(player, "length").as(v => v > 0 ? length_str(v) : "0:00")}
        />
      </box>
    </box>
  );
}

export function MediaPlayerWindow(): JSX.Element {
  return (
    <DropdownMenu
      name="media-window"
    >
      <box className="media-container" hexpand vexpand>
        {bind(current_player).as(p => (<MediaPlayer player={p} />))}
      </box>
    </DropdownMenu>
  );
}

export function Media(): JSX.Element {
  mpris.get_players().forEach(p => p.connect("notify", update_current_player));
  ["player-added", "player-closed"].forEach((signal) => {
    mpris.connect(signal, () => {
      update_current_player(current_player.get());
      current_player.get().connect("notify", update_current_player);
    });
  });
  return (
    <button
      className="media bar-item"
      onClick={self => open_menu(self, "media-window")}>
      <box spacing={15}>
        <label className="bar-icon" label={bind(current_info).as(({ icon }) => icon)} />
        <label
          label={bind(current_info).as(({ title, artist }) => truncate(`${artist} - ${title}`, 30))}
        />
      </box>
    </button>
  );
}
