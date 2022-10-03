import {fbSignedUserRTDbURL} from '../../../../globals';

export const deleteFromFbRTDb = async (url: string) => {
  console.log('Deleteing from ', `${fbSignedUserRTDbURL}${url}.json`);
  const response = await fetch(`${fbSignedUserRTDbURL}${url}.json`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    const errorID = JSON.parse(errorResponse);

    throw new Error('Something went wrong' + errorID.error.message);
  }

  return await response.json();
};
