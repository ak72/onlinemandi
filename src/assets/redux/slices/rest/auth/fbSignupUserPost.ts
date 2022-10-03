import {fbSignupURL} from '../../../../globals';
import {ISignupORLoginPOSTData} from '../../../../interface';

export const fbSignupUser = async (data: ISignupORLoginPOSTData) => {
  // console.log('From fetch ');
  // console.log(data);

  const response = await fetch(fbSignupURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      returnSecureToken: true,
    }),
  });
  if (!response.ok) {
    const errorResData = await response.text();
    const errorID = JSON.parse(errorResData);
    let message = 'Something went wrong';
    if (errorID.error.message === 'EMAIL_EXISTS') {
      message = 'This email already exists';
    } else if (errorID.error.message === 'OPERATION_NOT_ALLOWED') {
      message = 'Password sign-in is disabled';
    } else if (errorID.error.message === 'PHONE_NUMBER_ALREADY_EXISTS') {
      message = 'Phone number already in use';
    } else if (errorID.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
      message =
        'All requests are  blocked due to unusual activity. Try again later.';
    }
    throw new Error(message);
  }
  return response.json();
};
