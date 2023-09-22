// Node modules
import { useParams } from "react-router-dom";

// Project files
import ContainerCards from "components/ListCards";
import NavigationBar from "components/NavigationBar";
import StatusEmpty from "components/StatusEmpty";
import StatusError from "components/StatusError";
import StatusLoading from "components/StatusLoading";
import eStatus from "types/eStatus";
import iMedia from "types/iMedia";
import { useState, useEffect } from "react";
import { useUser } from "state/UserContext";

export default function Media() {
  // Global state
  const { code } = useParams();
  const { user } = useUser();

  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [data, setData] = useState(new Array<iMedia>());

  // Properties
  const endPoint = "media/";

  // Methods
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}${endPoint + code + "/"}`;
    fetch(url, {
      method: "GET",
      // body: JSON.stringify(form),
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        response.json().then((resp: any) => onSuccess(resp));
      })
      .catch((error) => onFailure(error));
  }, [code]);

  function onSuccess(data: iMedia[]) {
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
    <div id="media">
      <NavigationBar />
      <h1>All our {code}</h1>
      <ContainerCards title="Titles avaialble" data={data} />
    </div>
  );
}
