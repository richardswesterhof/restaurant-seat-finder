<template>
  <div class="content">
    <h1 style="margin-left: 2%">Edit Account</h1>
    <div class="columns is-mobile">
      <div class="column is-6 is-offset-1">
        <button
          class="button is-right is-primary"
          id="ChangePasswordButton"
          style="margin-bottom: 2%"
          @click="isCardModalActive = true"
        >Change Password</button>

        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
          <div class="card">
            <div class="card-content">
              <b-field label="Your Password" id="passwordText">
                <b-input
                  v-model="placePassword"
                  id="oldPassword"
                  rounded
                  placeholder = "Your password"
                >
                </b-input>
              </b-field>
              <b-field label="New Password" id="newPasswordText">
                <b-input
                  v-model="placeNewPassword"
                  id="newPasswordUpdate"
                  rounded
                  placeholder = "New password"
                >
                </b-input>
              </b-field>
              <b-field label="Repeat New Password" id="repeatNewPasswordText">
                <b-input
                  v-model="placeRepeatNewPassword"
                  id="repeatNewPassword"
                  rounded
                  placeholder = "Repeat password"
                >
                </b-input>
              </b-field>
              <button class="button is-right is-primary" @click.prevent="edit" id="registerButton">Confirm</button>
            </div>
          </div>
        </b-modal>


        <b-field label="Restaurant Name" id="registerNameText">
          <b-input
            v-model=resData.name
            id="nameUpdate"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Email" id="registerEmailText">
          <b-input
            v-model=resData.email
            id="emailUpdate"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Restaurant website" id="websiteText">
          <b-input
            v-model=resData.website
            id="websiteRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Restaurant phone number" id="phoneNumberText">
          <b-input
            v-model=resData.address.house_number
            id="phoneUpdate"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Total seats" style="width: 20%">
          <b-input
            v-model=resData.total_seats
            id="totalSeatsUpdate"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Description">
          <b-input v-model=resData.description maxlength="300" type="textarea"></b-input>
        </b-field>

        <button class="button is-right is-primary" @click.prevent="update" id="editButton">Confirm</button>
        <button class="button is-right is-primary" @click.prevent="deleteAccount" style="margin-left: 1%" id="deleteButton">Delete Account</button>
      </div>

      <b-loading :active="isLoading"></b-loading>
    </div>
  </div>
</template>
<script>
  import api from '../../api/api_wrapper';
  import cookieHandler from '../../utils/CookieHandler';

    export default {
        name: "RestaurantEditAccountPage",

      data() {
        return {
          authToken: '',
          resData: {},
          finishedAuthentication: false,
          isCardModalActive: false,

          requiredFields: [
            {id: 'nameUpdate'},
            {id: 'emailUpdate'},
            {id: 'oldPassword'},
            {id: 'newPasswordUpdate'},
            {id :'phoneUpdate'},
            {id: 'totalSeatsUpdate'},
          ],
        }
      },

      async beforeRouteEnter(to, from, next) {
        let cookieToken = cookieHandler.getCookie('authToken', 512);
        if(!(from.params.authToken || cookieToken)) {
          next({name: 'Login', params: {reasonMessage: 'No session token found, please log in'}});
        }
        else {
          api.reAuthenticate(cookieToken).then((response) => {
            //authenticated
            if(response.status === 200) {
              //console.log(response);
              next(vm => {
                vm.authToken = from.params.authToken ? from.params.authToken : cookieToken;
                vm.resData = response.data;
                vm.finishedAuthentication = true;
              });
            }
            //not authenticated
            else {
              next({name: 'Login', params: {reasonMessage: 'Your session could not be verified, please log in again'}});
            }
          });
        }
      },

      async mounted() {
        await this.$nextTick();
        this.$store.dispatch('loginSuccessful', {authToken: this.authToken});
      },

      methods: {
          update(){
            api.
          },
        deleteAccount(){

        }
      }
    }
</script>

<style scoped>

</style>
