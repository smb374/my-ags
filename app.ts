import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/Bar"
import { MediaPlayerWindow } from "./widget/Media";
import { AudioWindow } from "./widget/Audio";

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);
    MediaPlayerWindow();
    AudioWindow();
  },
})
