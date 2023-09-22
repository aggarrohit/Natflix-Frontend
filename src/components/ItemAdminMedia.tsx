// Node modules
import { Link } from "react-router-dom";

// Project files
import FormUpdate from "components/FormUpdate";
import FormDelete from "components/FormDelete";
import { useModal } from "state/ModalContext";
import iMedia from "types/iMedia";
import eMediaType from "types/eMediaType";
import ImageWithLoader from "./ImageWithLoader";

interface iProps {
  item: iMedia;
  endPoint: string;
  fields: Array<any>;
  code: string;
}

export default function ItemAdminMedia({
  item,
  endPoint,
  fields,
  code,
}: iProps) {
  const { id, media_type_id, title, thumbnail_url } = item;

  // Global
  const { setModal } = useModal();

  // Components
  const Update = (
    <FormUpdate endPoint={endPoint} fields={fields} data={item} code={code} />
  );
  const Delete = <FormDelete endPoint={endPoint} id={id} code={code} />;
  const TVSeriesEpisodes = (
    <Link className="button" to={"/admin-tv-series/" + id}>
      Episodes
    </Link>
  );

  return (
    <article className="item-admin">
      <ImageWithLoader image_url={thumbnail_url} />
      <h3>{title}</h3>
      <div className="buttons">
        <button onClick={() => setModal(Update)}>Update</button>
        <button onClick={() => setModal(Delete)}>Delete</button>
        {media_type_id === eMediaType.SERIES && TVSeriesEpisodes}
      </div>
    </article>
  );
}
