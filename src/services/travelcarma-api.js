import Global from "@utils/global";
import * as config from "../config";
import UtilService from "@utils/utils";

module.exports = {

    async baseApi(sub_url, method, json_data, cb) {
        try {
          let request = {
            method,
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": Global.currentUser
                ? "bearer " + Global.currentUser['access_token']
                : null,
            }
          };
          if (method == "POST" || method == "PUT") {
            request["body"] = JSON.stringify(json_data);
          }
          console.log(request)
          let response = await fetch(config.SERVICE_API_URL + sub_url, request);
          let responseJson = await response.json();
          if (response.status == 200) {
            cb(null, responseJson);
          } else {
            cb(responseJson);
          }
        } catch (error) {
          cb(error);
        }
      },
    
      async init(cb) {
        //check if current user exists or not
        var email = await UtilService.getLocalStringData('email');
        var password = await UtilService.getLocalStringData('password');
    
        if (password) {
          this.login(email, password, (err, user) => {
            cb(err, user)
          })
        } else {
          cb(null)
        }
      },
    
      login(email, password, cb) {
        this.baseApi('/api/auth/login_dealer', 'POST', { email, password }, (err, res) => {
          if (err == null) {
            Global.currentUser = res
            UtilService.saveLocalStringData('email', email);
            UtilService.saveLocalStringData('password', password);
          }
          cb(err, res)
        })
      },

  logout() {
      UtilService.removeLocalObjectData('email')
      UtilService.removeLocalObjectData('password')
  },

  async uploadImage(file, cb) {
    // console.log('uploadImage',file)
    if ( !Global.hasInternetConnection ){
      let index = await this.pushApi('uploadImage', null, file)
      UtilService.saveLocalStringData(''+index,file)
      cb(null, index)
      return;
    }
    try {
      let image = {
        uri: file,
        type: "image/jpeg",
        name: "file.jpeg"
      };

      let formData = new FormData();
      formData.append("file", image);
      // console.log('uploadImage',file)
      let response = await fetch(
        config.SERVICE_API_URL + "/api/common/files/upload",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "bearer " + Global.currentUser["token"],
            client: Global.clientID
          },
          body: formData
        }
      );
      let status = response.status;

      let responseJson = await response.json();
      if (status == 200 || status == 201) {
        cb(null, responseJson);
      } else {
        cb(responseJson.message);
      }
    } catch (error) {
      cb(error);
    }
  },
};
