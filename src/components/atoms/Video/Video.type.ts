export type VideoProps = {
  style?: Record<string, unknown>;
  videoUrl: string;
  videoType: string;
  enabled?: boolean;
  muted?: boolean;
  className?: string;
  poster?: string;
  playOnHover?: boolean;
  autoPlay?: boolean;
};
