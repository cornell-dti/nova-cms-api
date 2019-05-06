import { JSONParsable, JSONObject, JSONEnum, JSONArray, JSONProperty } from '../lib/json';
import * as ResourceTemplate from './resource-templates';

@JSONParsable({ key: 'string' })
export class PageResource extends JSONObject {
    key: string;
    @JSONEnum(ResourceTemplate.ResourceType)
    type: ResourceTemplate.ResourceType
    @JSONProperty({
        type: obj => true,
        parse: (obj) => {
            if (typeof obj === 'string' || ResourceTemplate.is_link_description(obj) || ResourceTemplate.is_img_description(obj)) {
                return obj;
            } else if (Array.isArray(obj)) {
                let pageResources: PageResource[] = [];
                obj.forEach(pageRes => { pageResources.push(PageResource.fromJSON(pageRes)) });
                return pageResources;
            } else {
                return obj;
            }
        }
    })
    value: string | ResourceTemplate.LinkDescription | ResourceTemplate.ImageDescription | PageResource[]
}

@JSONParsable({ id: 'string' })
export class PageDocument extends JSONObject {
    id: string;
    @JSONArray(PageResource)
    fields: PageResource[]
}