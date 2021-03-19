import { getMyAccount, IAccount } from '@services/user';
import { userActions } from '@store/slices/user';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

function* handleGetUserRequest() {
  try {
    const user: AxiosResponse<IAccount> = yield call(getMyAccount);
    yield put(userActions.getUserSuccess(user.data));
  } catch (error) {
    yield put(userActions.getUserFailed());
  }
}

function* userSaga() {
  yield takeLatest(userActions.getUserRequest.type, handleGetUserRequest);
}

export default userSaga;