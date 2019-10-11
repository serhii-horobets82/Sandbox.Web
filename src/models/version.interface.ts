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
  dbName?: string;
  connectionStringName?: string;
  connectionStringEnvironmentName?: string;
  type?: string;
}

export interface DatabaseSetupParams {
  id: string;
  adminEmail?: string;
  organizationName?: string;
  organizationDomain?: string;
  forceRecreate?: boolean;
  randomData?: RandomData;
}

export interface RandomData {
  users?: number;
  managers?: number;
  hrs?: number;
  admins?: number;
}
