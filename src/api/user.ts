import { getAuth } from "firebase/auth";
import { User } from "../model/user";

// api.ts
export const sendUserToServer = async (user: User) => {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken();

  if (!token) {
    console.error("No Firebase ID token available");
    alert("No Firebase ID token available. Please login again. ");
    return;
  }
  // Remember to replace the URL below with your own API URL
  try {
    const response = await fetch("https://your-backend-api.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Sending the token in the header
      },
      body: JSON.stringify({
        email: user.email,
        username: user.username, // User data excluding the token
      }),
    });

    if (!response.ok) {
      throw new Error("Server responded with an error!");
    }

    const responseData = await response.json();
    console.log("User data sent successfully:", responseData);
    // Additional logic such as redirecting the user or storing session data
  } catch (error) {
    console.error("Failed to send user data:", error);
    // Handle errors here, such as showing an error message to the user
  }
};
