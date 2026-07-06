import { GoogleAuthProvider } from "firebase/auth";

const providers = { google: new GoogleAuthProvider() };

type Provider = keyof typeof providers;

export const useAuth = () => {};
