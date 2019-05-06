import { JSONParsable, JSONObject, JSONEnum, JSONArray, JSONProperty } from '../lib/json';
import * as ResourceTemplate from './resource-templates';

@JSONParsable({ key: 'string' })
export class ProjectResource extends JSONObject {
    key: string;
    @JSONEnum(ResourceTemplate.ResourceType)
    type: ResourceTemplate.ResourceType
    @JSONProperty({
        type: obj => true,
        parse: (obj) => {
            if (typeof obj === 'string' || ResourceTemplate.is_link_description(obj) || ResourceTemplate.is_img_description(obj)) {
                return obj;
            } else if (Array.isArray(obj)) {
                let pageResources: ProjectResource[] = [];
                obj.forEach(pageRes => { pageResources.push(ProjectResource.fromJSON(pageRes)) });
                return pageResources;
            } else {
                return obj;
            }
        }
    })
    value: string | ResourceTemplate.LinkDescription | ResourceTemplate.ImageDescription | ProjectResource[]
}

@JSONParsable({ id: 'string' })
export class ProjectDocument extends JSONObject {
    id: string;
    @JSONArray(ProjectResource)
    fields: ProjectResource[]
}