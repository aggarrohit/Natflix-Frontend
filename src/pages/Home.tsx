// Node modules
import { useEffect, useState } from "react";

// Project files
import HeroHome from "components/HeroHome";
import ContainerCards from "components/ListCards";
import NavigationBar from "components/NavigationBar";
import StatusEmpty from "components/StatusEmpty";
import StatusError from "components/StatusError";
import StatusLoading from "components/StatusLoading";
import eStatus from "types/eStatus";
import iMedia from "types/iMedia";
import { useUser } from "state/UserContext";

export default function Home() {
  const { user } = useUser();

  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [data, setData] = useState(new Array<iMedia>());

  // Properties
  const endPoint = "media/";
  const tvSeries = data.filter((item) => item.media_type_id === 1);
  const movies = data.filter((item) => item.media_type_id === 2);
  const documentaries = data.filter((item) => item.media_type_id === 3);
  const firstItemToShow = tvSeries[0];

  // Methods
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}${endPoint}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        response.json().then((resp: any) => onSuccess(resp));
      })
      .catch((error) => onFailure(error));
  }, []);

  async function onSuccess(data: iMedia[]) {
    setData(data);
    setStatus(eStatus.READY);
  }

  function onFailure(error: string) {
    console.error(error);
    setStatus(eStatus.ERROR);
  }

  // Safeguards
  if (status === eStatus.LOADING) return <StatusLoading />;
  if (status === eStatus.ERROR) return <StatusError />;
  if (data.length === 0) return <StatusEmpty />;

  return (
    <div id="home">
      <NavigationBar />
      {firstItemToShow && <HeroHome item={firstItemToShow} />}
      <ContainerCards title="Series" data={tvSeries} />
      <ContainerCards title="Movies" data={movies} />
      <ContainerCards title="Documentaries" data={documentaries} />
    </div>
  );
}
