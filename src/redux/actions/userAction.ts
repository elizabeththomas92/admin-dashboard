import {
  APIFetcher,
  APIPartialUpdater,
  APIRemover,
  APIUpdater,
} from "../../services";
import { IUser } from "../../types";

export const addUser = (user: IUser) => async (dispatch: any) => {
  try {
    const res = await APIUpdater(
      `https://blue-journalist-bbrpv.ineuron.app:4000/user/create`,
      user
    );

    dispatch({
      type: "ADD_USER",
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveUser =
  (user_id: number) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    try {
      const res = await APIFetcher(
        `https://blue-journalist-bbrpv.ineuron.app:4000/user/${user_id}`
      );

      dispatch({
        type: "RETRIEVE_USER",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const updateUser =
  (user_id: string, userDetails: IUser) =>
  async (dispatch: (arg0: { type: string; payload: IUser }) => void) => {
    try {
      const res = await APIPartialUpdater(
        `https://blue-journalist-bbrpv.ineuron.app:4000/user/${user_id}`,
        userDetails
      );

      dispatch({
        type: "UPDATE_USER",
        payload: userDetails,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const deleteUser =
  (currentUser: number) =>
  async (
    dispatch: (arg0: { type: string; payload: { currentUser: number } }) => void
  ) => {
    try {
      await APIRemover(
        `https://blue-journalist-bbrpv.ineuron.app:4000/user/${currentUser}`
      );

      dispatch({
        type: "REMOVE_USER",
        payload: { currentUser },
      });
    } catch (err) {
      console.log(err);
    }
  };
