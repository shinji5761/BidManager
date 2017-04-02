import { Service } from '../common/Service';

/**
 *
 */
export class OneDayService extends Service {

    /**
     * [createPostParams description]
     * @override
	 * @param {any} body ボディデータ
     */
    public createPostParams(body :any) :Object {
        this.logger.system.debug('OneDayService.cratePostParams: start');
        let params = {
            // 'sql': 'INSERT INTO bid_manager.one_day(code, targetDate, open, high, low, close, volume)  VALUES(:code, :targetDate, :open, :high, :low, :close, :volume) ON DUPLICATE KEY UPDATE high = :high, low = :low, close = :close, volume = :volume',
            // 'data': {'code': body.code, 'targetDate': body.targetDate, 'open': body.open, 'high': body.high, 'low': body.low, 'close': body.close, 'volume': body.volume}
            'sql': 'INSERT INTO bid_manager.one_day(code, targetDate, open, high, low, close, volume)  VALUES(?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE high=?, low=?, close=?, volume=?',
            'data': [body.code, body.targetDate, body.open, body.high, body.low,  body.close, body.volume, body.open, body.high, body.low,  body.close, body.volume]
        }
        return params;
    }
}
