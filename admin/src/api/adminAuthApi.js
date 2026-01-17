const API_URL = process.env.REACT_APP_API_URL;

export const adminSignup = async (email, password, adminKey) => {
  const response = await fetch(`${API_URL}/api/admin/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      adminKey
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Admin signup failed");
  }

  return data;
};

export const adminLogin = async (email, password) => {
  const response = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Admin login failed");
  }

  return data;
};




