// Project files
import IconPlay from "assets/images/icons/icon-play-black.svg";
import Placeholder from "assets/images/placeholders/banner.png";
import iMedia from "types/iMedia";
import ImageWithLoader from "./ImageWithLoader";

interface iProps {
  item: iMedia;
  videoCode: string;
  onClick: Function;
}

export default function HeroDetails({ item, videoCode, onClick }: iProps) {
  const { banner_url } = item;

  // Properties
  const Image = banner_url === "" ? Placeholder : banner_url;

  return (
    <header className="hero hero-details">
      <div className="background-image">
        <ImageWithLoader image_url={banner_url} />
      </div>
      <div className="content">
        <button className="white" onClick={() => onClick(videoCode)}>
          <img className="icon" src={IconPlay} />
          Play
        </button>
      </div>
    </header>
  );
}
