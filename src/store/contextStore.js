import {observable, computed, action, runInAction} from 'mobx'
import {get} from '../common/HttpTool'

export default class TestStore {
    @observable carouselList = [];
    @observable errorMsg = '';
    @observable page = 1;
    @observable isRefreshing = false;
    @observable isNoMore = true;

    @action
    fetchCarouselList = async () => {
        try {
            if (this.isRefreshing) this.page = 1
            const url = '//basic.test.liefengtech.com/api/finger/project/getHomeImages'
            const params = {
                projectId:'8af41b8e53f37e4a0153f3a5a5d2000b'
            }
            const responseData = await get({url, params, timeout: 30}).then(res => res.json())
            console.log(responseData)
            //const {feeds, page, total_pages} = responseData

            // runInAction(() => {
            //     this.isRefreshing = false
            //     this.errorMsg = ''
            //     this.isNoMore = page >= total_pages
            //
            //     if (this.page === 1) {
            //         this.feedList.replace(feeds)
            //     } else {
            //         this.feedList.splice(this.feedList.length, 0, ...feeds);
            //     }
            // })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
        }
    }

    @computed
    get isFetching() {
        return this.feedList.length === 0 && this.errorMsg === ''
    }

    @computed
    get isLoadMore() {
        return this.page !== 1
    }
}