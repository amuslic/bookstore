export interface AppSettings {
  name: string;
  production: boolean;
  user: UserConfiguration;
}

interface UserConfiguration {
  getUser: string;
  createUser: string;
}
