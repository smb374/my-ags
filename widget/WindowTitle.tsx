import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";
import { truncate } from "../utils";

const hyprland = Hyprland.get_default();
const max_size = 30;


function capitalize_first_letter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function filter_title(client: Hyprland.Client | null): Record<string, string> {
  if (!client) {
    return {
      icon: '󰇄',
      label: 'Desktop',
    };
  }
  const windowTitleMap = [
    // Original Entries
    ['kitty', '󰄛', 'Kitty Terminal'],
    ['firefox', '󰈹', 'Firefox'],
    ['microsoft-edge', '󰇩', 'Edge'],
    ['discord', '', 'Discord'],
    ['vesktop', '', 'Vesktop'],
    ['org.kde.dolphin', '', 'Dolphin'],
    ['plex', '󰚺', 'Plex'],
    ['steam', '', 'Steam'],
    ['spotify', '󰓇', 'Spotify'],
    ['ristretto', '󰋩', 'Ristretto'],
    ['obsidian', '󱓧', 'Obsidian'],

    // Browsers
    ['google-chrome', '', 'Google Chrome'],
    ['brave-browser', '󰖟', 'Brave Browser'],
    ['chromium', '', 'Chromium'],
    ['opera', '', 'Opera'],
    ['vivaldi', '󰖟', 'Vivaldi'],
    ['waterfox', '󰖟', 'Waterfox'],
    ['thorium', '󰖟', 'Waterfox'],
    ['tor-browser', '', 'Tor Browser'],
    ['floorp', '󰈹', 'Floorp'],

    // Terminals
    ['gnome-terminal', '', 'GNOME Terminal'],
    ['konsole', '', 'Konsole'],
    ['alacritty', '', 'Alacritty'],
    ['wezterm', '', 'Wezterm'],
    ['foot', '󰽒', 'Foot Terminal'],
    ['tilix', '', 'Tilix'],
    ['xterm', '', 'XTerm'],
    ['urxvt', '', 'URxvt'],
    ['st', '', 'st Terminal'],

    // Development Tools
    ['code', '󰨞', 'Visual Studio Code'],
    ['vscode', '󰨞', 'VS Code'],
    ['sublime-text', '', 'Sublime Text'],
    ['atom', '', 'Atom'],
    ['android-studio', '󰀴', 'Android Studio'],
    ['intellij-idea', '', 'IntelliJ IDEA'],
    ['pycharm', '󱃖', 'PyCharm'],
    ['webstorm', '󱃖', 'WebStorm'],
    ['phpstorm', '󱃖', 'PhpStorm'],
    ['eclipse', '', 'Eclipse'],
    ['netbeans', '', 'NetBeans'],
    ['docker', '', 'Docker'],
    ['vim', '', 'Vim'],
    ['neovim', '', 'Neovim'],
    ['neovide', '', 'Neovide'],
    ['emacs', '', 'Emacs'],

    // Communication Tools
    ['slack', '󰒱', 'Slack'],
    ['telegram-desktop', '', 'Telegram'],
    ['org.telegram.desktop', '', 'Telegram'],
    ['whatsapp', '󰖣', 'WhatsApp'],
    ['teams', '󰊻', 'Microsoft Teams'],
    ['skype', '󰒯', 'Skype'],
    ['thunderbird', '', 'Thunderbird'],

    // File Managers
    ['nautilus', '󰝰', 'Files (Nautilus)'],
    ['thunar', '󰝰', 'Thunar'],
    ['pcmanfm', '󰝰', 'PCManFM'],
    ['nemo', '󰝰', 'Nemo'],
    ['ranger', '󰝰', 'Ranger'],
    ['doublecmd', '󰝰', 'Double Commander'],
    ['krusader', '󰝰', 'Krusader'],

    // Media Players
    ['vlc', '󰕼', 'VLC Media Player'],
    ['mpv', '', 'MPV'],
    ['rhythmbox', '󰓃', 'Rhythmbox'],

    // Graphics Tools
    ['gimp', '', 'GIMP'],
    ['inkscape', '', 'Inkscape'],
    ['krita', '', 'Krita'],
    ['blender', '󰂫', 'Blender'],

    // Video Editing
    ['kdenlive', '', 'Kdenlive'],

    // Games and Gaming Platforms
    ['lutris', '󰺵', 'Lutris'],
    ['heroic', '󰺵', 'Heroic Games Launcher'],
    ['minecraft', '󰍳', 'Minecraft'],
    ['csgo', '󰺵', 'CS:GO'],
    ['dota2', '󰺵', 'Dota 2'],

    // Office and Productivity
    ['evernote', '', 'Evernote'],
    ['sioyek', '', 'Sioyek'],

    // Cloud Services and Sync
    ['dropbox', '󰇣', 'Dropbox'],

    // Desktop
    ['^$', '󰇄', 'Desktop'],

    // Fallback icon
    ['(.+)', '󰣆', `${capitalize_first_letter(client.class ?? "")}}`],
  ];

  const foundMatch = windowTitleMap.find((wt) => RegExp(wt[0]).test((client.class ?? "").toLowerCase()));

  // return the default icon if no match is found or
  // if the array element matched is not of size 3
  if (!foundMatch || foundMatch.length !== 3) {
    return {
      icon: windowTitleMap[windowTitleMap.length - 1][1],
      label: windowTitleMap[windowTitleMap.length - 1][2],
    };
  }

  return {
    icon: foundMatch[1],
    label: foundMatch[2],
  };
}

export function WindowTitle(): JSX.Element {
  return (
    <box className="window-title bar-item">
      {bind(hyprland, "focused_client").as((c) => {
        const { icon, label } = filter_title(c);
        return (
          <box spacing={10}>
            <label className="window-title-tag" label={icon} />
            <label label={truncate(label, max_size)} />
          </box>
        );
      })}
    </box>
  );
}
