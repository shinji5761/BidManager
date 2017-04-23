// === Service ===
import { Service } from '../common/Service';

export class BrandListService extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * 検索データ作成処理
     * @override
     * @param  {any}    body ボディデータ
     * @return {Object}      SQLパラメータ
     */
    public createGetParams(body :any) :Object {
        this.logger.system.debug('BrandListService.createGetParams: start');
        let params = {
            'sql' : 'SELECT brandCode FROM brand_list',
            'data': []
        };
        return params;
    }

}
