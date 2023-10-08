import { useState, useEffect } from "react";

const localCache = {};

export default function useList(animal) {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setList([]);
    } else if (localCache[animal]) {
      setList(localCache[animal]);
    } else {
      requestList();
    }

    async function requestList() {
      setList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [list, status];
}
