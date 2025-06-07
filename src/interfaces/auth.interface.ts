export interface AuthState {
  uid: string | null;
  checking: boolean;
  logged: boolean;
  name: string | null;
  email: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<string | boolean>;
  verificaToken: () => Promise<boolean>;
  logout: () => void;
}
