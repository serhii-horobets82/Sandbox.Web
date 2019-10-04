export interface VersionInfo {
  version: string;
  creationDate: string;
  database: string;
  databaseType: string;
  name: string;
  organization: string;
}

export interface DatabaseInstance {
  id: string;
  name?: string;
  domainPrefix?: string;
  connectionStringName?: string;
  connectionStringEnvironmentName?: string;
  type?: string;
}
