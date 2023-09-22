interface DynamicObject {
  [key: string]: string | number | boolean;
}

export function generateFields(fields: Array<any>, data: any) {
  let result: DynamicObject = {};

  fields.forEach((item) => {
    const key: string = item.key;

    if (key == "banner_file" || key == "thumbnail_file") {
      result[key] = data[key == "banner_file" ? "banner_url" : "thumbnail_url"];
    } else {
      result[key] = data[key];
    }
  });

  return result;
}
