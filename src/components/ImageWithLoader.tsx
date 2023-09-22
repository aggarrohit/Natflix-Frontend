// Project files
import Placeholder from "assets/images/placeholders/card-basic.png";
import GetServerImage from "scripts/loadServerImage";
import { useUser } from "state/UserContext";
import { useEffect, useState } from "react";

interface iProps {
  image_url: string;
}

export default function ImageWithLoader({ image_url }: iProps) {
  // Global state
  const { user } = useUser();

  useEffect(() => {
    if (image_url && image_url !== "") {
      loadImage();
    } else {
      setImage(Placeholder);
    }
  }, [image_url]);

  const loadImage = async () => {
    const img = await GetServerImage(image_url, user);
    setImage(img);
  };

  // Properties
  const [Image, setImage] = useState<String>("");

  // Components
  return <img src={Image.toString()} />;
}
