// Project files
import ModalDetails from "components/ModalDetails";
import iMedia from "types/iMedia";
import { useModal } from "state/ModalContext";
import ImageWithLoader from "./ImageWithLoader";

interface iProps {
  item: iMedia;
}

export default function ItemCard({ item }: iProps) {
  // Global state
  const { setModal } = useModal();

  // Components
  const Modal = <ModalDetails item={item} />;

  return (
    <article className="item-card" onClick={() => setModal(Modal)}>
      <ImageWithLoader image_url={item.thumbnail_url} />
    </article>
  );
}
