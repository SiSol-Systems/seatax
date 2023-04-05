import type { DetailFeature } from "@/types/localcosmos/src/Features";

export interface FrontendInterface extends DetailFeature {
  userContent: object
}

export class Frontend {

  uuid: string
  version: number
  options: object
  globalOptions: object
  name: string
  slug: string
  userContent: object

  constructor(data: FrontendInterface) {

    this.uuid = data.uuid;
    this.version = data.version;
    this.options = data.options;
    this.globalOptions = data.globalOptions;
    this.name = data.name;
    this.slug = data.slug;
    this.userContent = data.userContent;

  }

}