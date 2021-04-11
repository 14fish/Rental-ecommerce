const host = process.env.REACT_APP_HOST;

export const config = {
  baseUrl: host,
  getAllProperty: host + "/property",
  getSinglePost: host + "/property",
  postDelete: host + "/property/delete",
  addNewProperty: host + "/property/add",
  userLogin: host + "/user/login",
  userRegister: host + "/user/register",
  userInfo: host + "/user/profile",
  userProperties: host + "/user/properties",
  userUpdateProperty: host + "/property/update",
  sendMessage: host + '/message/add',
  messages: host +  '/message',
  messageDelete: host + '/message/delete',
  messageArchive: host + '/message/update'
};