export async function getPosts(params = {}) {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== '' && value !== null && value !== undefined
    )
  )

  const queryParams = new URLSearchParams(cleanParams).toString()
  const url = queryParams ? `${import.meta.env.VITE_BACKEND_URL}/posts?${queryParams}` : `${import.meta.env.VITE_BACKEND_URL}/posts`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

export async function createPost(postData, token) {
  const authToken = localStorage.getItem('token'); 

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${authToken}` }),
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
}