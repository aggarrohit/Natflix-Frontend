// MPM packages
import { FormEvent, useEffect, useState } from "react";

// Project files
import { useModal } from "state/ModalContext";
import iMedia from "types/iMedia";
import ModalDetails from "./ModalDetails";
import { useUser } from "state/UserContext";
import ImageWithLoader from "./ImageWithLoader";

export default function SearchBox() {
  // Global state
  const { user } = useUser();
  const { setModal } = useModal();
  const [searchText, setSearchText] = useState("");
  const [resultMedia, setResultMedia] = useState<iMedia[]>([]);

  useEffect(() => {
    if (searchText.length == 0) setResultMedia([]);
    if (searchText && searchText.length > 3) {
      const url = `${process.env.REACT_APP_API_URL}media/search?search_text=${searchText}`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((response: any) => {
          response.json().then((resp: any) => onSuccess(resp));
        })
        .catch((error) => onFailure(error));
    }
  }, [searchText]);

  async function onSuccess(data: iMedia[]) {
    setResultMedia(data);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not search");
  }

  const SearchedMediaClicked = (media: iMedia) => {
    setResultMedia([]);
    setSearchText("");
    setModal(Modal(media));
  };

  const Modal = (media: iMedia) => <ModalDetails item={media} />;

  return (
    <div className="search-box">
      <input
        placeholder="search here.."
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      {resultMedia.map((media: iMedia) => {
        return (
          <div
            key={media.id}
            className="search-result-item"
            onClick={() => SearchedMediaClicked(media)}
          >
            <ImageWithLoader image_url={media.banner_url} />
            <label>{media.title}</label>
          </div>
        );
      })}
    </div>
  );
}
