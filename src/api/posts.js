export async function getPosts(params = {}) {

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== '' && value !== null && value !== undefined
    )
  )

  const queryParams = new URLSearchParams(cleanParams).toString()
  const url = queryParams ? `/api/v1/posts?${queryParams}` : '/api/v1/posts'

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

export async function createPost(postData) {
  const res = await fetch('/api/v1/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })

  if (!res.ok) {
    throw new Error('Failed to create post')
  }
  return res.json()
}