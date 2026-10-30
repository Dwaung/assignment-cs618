const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const signup = async ({ username, password }) => {
    const res = await fetch(`${API_URL}/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
        const message = await res.text()
        console.error('Signup failed:', res.status, message)
        throw new Error(message || 'Failed to sign up')
    }

    return await res.json()
}

export const login = async ({ username, password }) => {
    const res = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
        const message = await res.text()
        console.error('Login failed:', res.status, message)
        throw new Error(message || 'Failed to log in')
    }

    return await res.json()
}

export const getUserInfo = async (id) => {
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
        const message = await res.text()
        console.error('Get user info failed:', res.status, message)
        throw new Error(message || 'Failed to get user information')
    }

    return await res.json()
}