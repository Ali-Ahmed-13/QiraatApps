export interface LevelItem {
  name: string;
  desc: string;
  duration: string;
  status: string;
}

export interface TrackItem {
  title: string;
  description: string;
  levels: LevelItem[];
}

export interface ArabicLanguageData {
  nahw: TrackItem;
  sarf: TrackItem;
  balaghah: TrackItem;
}
