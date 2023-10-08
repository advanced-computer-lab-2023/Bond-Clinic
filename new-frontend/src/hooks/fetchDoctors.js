const fetchDoctors = async () => {
  const response = await fetch("http://localhost:4000/api/doctor");

  if (!response.ok) {
    throw new Error(`fetch not ok`);
  }

  return response.json();
};

export default fetchDoctors;
