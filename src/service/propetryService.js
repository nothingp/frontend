import {propertyUrl} from '../common/GlobalContants'
import {get} from '../common/HttpTool'

/**
 * 获取轮播图
 * @param projectId
 * @returns {Thenable<{type, alias, describe}>|*|Promise<{type, alias, describe}>|Promise.<TResult>}
 */
export function getHomeImages(projectId){
    const url = `${propertyUrl}/api/finger/project/getHomeImages`
    const params = {
        projectId
    }
    return get({url, params, timeout: 30}).then(res => res.json());
}