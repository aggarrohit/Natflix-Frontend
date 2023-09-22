// Project files
import FormUpdate from "components/FormUpdate";
import FormDelete from "components/FormDelete";
import { useModal } from "state/ModalContext";
import iTVSeries from "types/iTVSeries";
import ImageWithLoader from "./ImageWithLoader";

interface iProps {
  item: iTVSeries;
  endPoint: string;
  fields: Array<any>;
}

export default function ItemAdminEpisode({ item, endPoint, fields }: iProps) {
  const { id, title, season_number, episode_number, thumbnail_url } = item;

  // Global
  const { setModal } = useModal();

  const code = "episode";

  // Components
  const Update = (
    <FormUpdate endPoint={endPoint} fields={fields} data={item} code={code} />
  );
  const Delete = <FormDelete endPoint={endPoint} id={id} code={code} />;

  return (
    <article className="item-admin">
      <ImageWithLoader image_url={thumbnail_url} />
      <h3>{title}</h3>
      <div className="season-episode">
        <span className="title">Season & Episode</span>
        <span className="numbers">
          S{season_number}-E{episode_number}
        </span>
      </div>
      <div className="buttons">
        <button onClick={() => setModal(Update)}>Update</button>
        <button onClick={() => setModal(Delete)}>Delete</button>
      </div>
    </article>
  );
}
