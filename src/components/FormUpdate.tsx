// MPM packages
import { FormEvent, useState } from "react";

// Project files
import ListInput from "components/ListInput";
import { generateFields } from "scripts/formUtilities";
import { useModal } from "state/ModalContext";
import { useUser } from "state/UserContext";

interface iProps {
  endPoint: string;
  fields: Array<any>;
  data: any;
  code: string;
}

export default function FormUpdate({ endPoint, fields, data, code }: iProps) {
  // Global state
  const { setModal } = useModal();
  const { user } = useUser();
  // Local state
  const [form, setForm] = useState<Record<string, any>>(
    generateFields(fields, data)
  );

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //converting form to formData
    const formData = getFormData(form);

    const url = `${process.env.REACT_APP_API_URL}${endPoint + code}/${
      data.id
    }/`;
    fetch(url, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((response: any) => {
        response.json().then((resp: any) => onSuccess());
      })
      .catch((error) => onFailure(error));
  }

  function onSuccess() {
    alert("Item edited!");
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not edit item");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Edit information</h2>
      <ListInput fields={fields} state={[form, setForm]} />
      <hr />
      <button>Update</button>
      <button onClick={() => setModal(null)}>Cancel</button>
    </form>
  );
}
function getFormData(form: Record<string, any>) {
  const formData = new FormData();

  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      if (key == "banner_file" || key == "thumbnail_file") {
        if (typeof form[key] == "object") {
          const fileName = "image.png";

          const imageFile = new File([form[key]], fileName, {
            type: "image/png",
          });
          formData.append(key, imageFile);
        }
      } else {
        formData.append(key, form[key]);
      }
    }
  }
  return formData;
}
