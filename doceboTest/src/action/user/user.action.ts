import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppDoceboStore} from 'store/types';
import {DoceboAppAction} from 'action/types';
import gitServices, {OrderBy, SortBy} from 'http-client/git.service';
import {GitHubUserInfo, GitHubUserRepo} from 'model/gitApi.model';
import {startLoading, stopLoading} from 'action/loading/loading.action';
import {Route} from 'navigation/route';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export interface UserActionPayload{
    userInfo?: GitHubUserInfo,
    userRepo?: GitHubUserRepo[]
}

export const aboutUser = (navigation: any, username: string): ThunkAction<Promise<void>, AppDoceboStore, {}, DoceboAppAction<any>> => {
    return async (dispatch: ThunkDispatch<AppDoceboStore, {}, DoceboAppAction<any>>, getState: () => AppDoceboStore,) => {
        dispatch(startLoading());
        await Promise.all([
            dispatch(fetchUser(navigation, username)),
            dispatch(fetchUserRepos(username))
        ]);
        dispatch(stopLoading());
        navigation.navigate(Route.USER_DETAILS.name,{ username });
    };
};

export const fetchUser = (navigation: any, username: string): ThunkAction<Promise<void>, AppDoceboStore, {}, DoceboAppAction<any>> => {
    return async (dispatch: ThunkDispatch<AppDoceboStore, {}, DoceboAppAction<any>>, getState: () => AppDoceboStore,) => {
        dispatch({
            type: FETCH_USER,
            payload: null,
        });
        try {
            const response = await gitServices.getUser(username);
            dispatch(dataUserSuccess({
                userInfo: response
            }));
        } catch (e) {
            dispatch(dataUserFailure());
        }
    };
};

export const dataUserSuccess = (newState: UserActionPayload): DoceboAppAction<any> => ({
    type: FETCH_USER_SUCCESS,
    payload: newState,
    error: false,
});

export const dataUserFailure = (): DoceboAppAction<any> => ({
    type: FETCH_USER_FAILURE,
    payload: null,
    error: true,
});

export const FETCH_USER_REPOS = 'FETCH_USER_REPOS';
export const FETCH_USER_REPOS_SUCCESS = 'FETCH_USER_REPOS_SUCCESS';
export const FETCH_USER_REPOS_FAILURE = 'FETCH_USER_REPOS_FAILURE';

export const fetchUserRepos = (username: string, sortBy?: SortBy, orderBy?: OrderBy): ThunkAction<Promise<void>, AppDoceboStore, {}, DoceboAppAction<any>> => {
    return async (dispatch: ThunkDispatch<AppDoceboStore, {}, DoceboAppAction<any>>, getState: () => AppDoceboStore,) => {
        dispatch({
            type: FETCH_USER_REPOS,
            payload: null,
        });
        try {
            const response = await gitServices.getRepos(username,sortBy,orderBy);
            dispatch(dataUserReposSuccess({
                userRepo: response
            }));
        } catch (e) {
            dispatch(dataUserReposFailure());
        }
    };
};

export const dataUserReposSuccess = (newState: UserActionPayload): DoceboAppAction<any> => ({
    type: FETCH_USER_REPOS_SUCCESS,
    payload: newState,
    error: false,
});

export const dataUserReposFailure = (): DoceboAppAction<any> => ({
    type: FETCH_USER_REPOS_FAILURE,
    payload: null,
    error: true,
});
