// Node modules
import { ChangeEvent, useState } from "react";

// Project files
import Placeholder from "assets/images/placeholders/card-basic.png";
import iInputImage from "types/iInputImage";
import readFile from "scripts/resize-image/readFile";
import resizeImage from "scripts/resize-image/resizeImage";
import ImageWithLoader from "./ImageWithLoader";

interface iProps {
  field: iInputImage;
  state: [any, Function];
}

export default function InputImage({ field, state }: iProps) {
  const { key, label, imageWidth } = field;
  const [value, setValue] = state;

  // Properties
  const selectedImage = value[key];
  const imageURL = selectedImage === undefined ? Placeholder : selectedImage;
  const [finalImage, setFinalImage] = useState("");

  // Methods
  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    // Safeguard
    if (!event.currentTarget.files) return;

    const files = event.currentTarget.files;
    const file = files[0];
    const image: string = await readFile(file);
    const resizedImage: Blob = await resizeImage(image, imageWidth, 0);
    const finalPicture = await readFile(resizedImage);
    setFinalImage(finalPicture);

    const clonedItem = { ...value };
    clonedItem[key] = resizedImage;

    setValue(clonedItem);
  }

  return (
    <label className="input input-image">
      <span>{label}:</span>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(event) => onChange(event)}
      />

      {finalImage ? (
        <img
          src={finalImage}
          onError={(event) => (event.currentTarget.src = Placeholder)}
        />
      ) : (
        <ImageWithLoader image_url={selectedImage} />
      )}
    </label>
  );
}
