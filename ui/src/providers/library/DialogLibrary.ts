import { LoadingController } from 'ionic-angular';

/**
 * @class DialogLibrary
 */
export class DialogLibrary {
    /**
     * @private
     * @static
     */
    private static GET_MESSAGE :string = '取得中...';

    /**
     * @private
     * @static
     */
    private static SAVE_MESSAGE :string = '保存中...';

    /**
     * @private
     * @static
     */
    private static DELETE_MESSAGE :string = '削除中...';

    /**
     * Getダイアログオブジェクト 作成処理
     * @param  {LoadingController} loadingCtrl ionic ローディングコントローラ
     * @return {any} ダイアログオブジェクト
     */
    public createGetDialog(loadingCtrl :LoadingController) :any {
        return loadingCtrl.create({'content': DialogLibrary.GET_MESSAGE});
    };

    /**
     * Saveダイアログオブジェクト 作成処理
     * @param  {LoadingController} loadingCtrl ionic ローディングコントローラ
     * @return {any} ダイアログオブジェクト
     */
    public createSaveDialog(loadingCtrl :LoadingController) :any {
        return loadingCtrl.create({'content': DialogLibrary.SAVE_MESSAGE});
    };


    /**
     * Deleteダイアログオブジェクト 作成処理
     * @param  {LoadingController} loadingCtrl ionic ローディングコントローラ
     * @return {any} ダイアログオブジェクト
     */
    public createDeleteDialog(loadingCtrl :LoadingController) :any {
        return loadingCtrl.create({'content': DialogLibrary.DELETE_MESSAGE});
    };
}
