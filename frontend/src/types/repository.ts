import isEmpty from "lodash-es/isEmpty";
import { RepositoryId, VCSId } from "./id";
import { Principal } from "./principal";
import { Project } from "./project";
import { VCS } from "./vcs";

export type Repository = {
  id: RepositoryId;

  // Standard fields
  creator: Principal;
  createdTs: number;
  updater: Principal;
  updatedTs: number;

  // Related fields
  vcs: VCS;
  project: Project;

  // Domain specific fields
  // e.g. sample-project
  name: string;
  // e.g. bytebase/sample-project
  fullPath: string;
  // e.g. http://gitlab.bytebase.com/bytebase/sample-project
  webUrl: string;
  baseDirectory: string;
  branchFilter: string;
  filePathTemplate: string;
  schemaPathTemplate: string;
  sheetPathTemplate: string;
  // e.g. In GitLab, this is the corresponding project id.
  externalId: string;
};

export type RepositoryCreate = {
  // Related fields
  vcsId: VCSId;

  // Domain specific fields
  name: string;
  fullPath: string;
  webUrl: string;
  branchFilter: string;
  baseDirectory: string;
  filePathTemplate: string;
  schemaPathTemplate: string;
  sheetPathTemplate: string;
  externalId: string;
  accessToken: string;
  expiresTs: number;
  refreshToken: string;
};

export type RepositoryPatch = {
  baseDirectory?: string;
  branchFilter?: string;
  filePathTemplate?: string;
  schemaPathTemplate?: string;
  sheetPathTemplate?: string;
};

export type RepositoryConfig = {
  baseDirectory: string;
  branchFilter: string;
  filePathTemplate: string;
  schemaPathTemplate: string;
  sheetPathTemplate: string;
};

export type ExternalRepositoryInfo = {
  // e.g. In GitLab, this is the corresponding project id. e.g. 123
  externalId: string;
  // e.g. sample-project
  name: string;
  // e.g. bytebase/sample-project
  fullPath: string;
  // e.g. http://gitlab.bytebase.com/bytebase/sample-project
  webUrl: string;
};

export function baseDirectoryWebUrl(repository: Repository): string {
  if (repository.vcs.type == "GITLAB_SELF_HOST") {
    let url = `${repository.webUrl}/-/tree/${repository.branchFilter}`;
    if (!isEmpty(repository.baseDirectory)) {
      url += `/${repository.baseDirectory}`;
    }
    return url;
  } else if (repository.vcs.type == "GITHUB_COM") {
    let url = `${repository.webUrl}/tree/${repository.branchFilter}`;
    if (!isEmpty(repository.baseDirectory)) {
      url += `/${repository.baseDirectory}`;
    }
    return url;
  }

  return repository.webUrl;
}
