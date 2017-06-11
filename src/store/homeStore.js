import {observable, computed, action, runInAction} from 'mobx'
import {getHomeImages} from '../service/propetryService'

class HomeStore {
    @observable carouselList = [];
    @observable errorMsg = '';
    @observable page = 1;
    @observable isRefreshing = false;
    @observable isNoMore = true;

    @action
    fetchCarouselList = async () => {
        try {
            const responseData = await getHomeImages('8af41b8e53f37e4a0153f3a5a5d2000b');
            const {dataList} = responseData;

            runInAction(() => {
                this.isRefreshing = false
                this.carouselList = dataList;
            })
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

export default new HomeStore()