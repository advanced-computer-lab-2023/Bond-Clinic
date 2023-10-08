const fetchDoctor = async ({ queryKey }) => {
  const id = queryKey[1];
  const response = await fetch(`http://localhost:4000/api/doctor/${id}`);

  if (!response.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return response.json();
};

export default fetchDoctor;
