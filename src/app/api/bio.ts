const fetchBio = async (names: string[]) => {
  const response = await fetch('/api/bio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ names }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export {
  fetchBio,
};
