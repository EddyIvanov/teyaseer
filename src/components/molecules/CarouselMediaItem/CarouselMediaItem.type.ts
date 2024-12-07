import { AssetType } from '@/types/ContentFul.type';

interface MediaItemProps {
  contentType: string;
  url: string;
  title: string;
  poster?: AssetType;
  onVideoClick: () => void;
}

export default MediaItemProps;
