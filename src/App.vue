<template>
  <div id="app">
    <div class="container">
      <Member
        :memberUpdate="memberEdit"
        :changeButton="submitted"
        @add="addMember"
        @editM="editMember"
      />
      <h3>List Member</h3>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col" class="stt">#</th>
              <th scope="col">Account</th>
              <th scope="col">Full name</th>
              <th scope="col">Email</th>
              <th scope="col" class="text-center">Dob</th>
              <th scope="col">Role</th>
              <th scope="col" class="text-center">Acction</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-show="members.length"
              v-for="(member, index) in members"
              :key="index"
            >
              <th scope="row" style="width: 15px">
                {{ index + 1 }}
              </th>
              <td
                scope="row"
                data-toggle="tooltip"
                data-placement="top"
                title="ABC"
              >
                {{ member.account }}
              </td>
              <td
                scope="row"
                data-toggle="tooltip"
                data-placement="top"
                title="ABC"
              >
                {{ member.fullName }}
              </td>
              <td
                scope="row"
                data-toggle="tooltip"
                data-placement="top"
                title="ABC"
              >
                {{ member.email }}
              </td>
              <td
                scope="row"
                data-toggle="tooltip"
                data-placement="top"
                title="ABC"
                class="text-center"
              >
                {{ member.dob | formatDate }}
              </td>
              <td
                scope="row"
                data-toggle="tooltip"
                data-placement="top"
                title="ABC"
              >
                {{ member.role }}
              </td>
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-warning mr"
                  @click="edit(member)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteMember(index)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-show="!members.length" style="text-align: center">
          No items displayed!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Member from './components/Member.vue';
// import MemberDataService from './service/MemberDataService.js';
export default {
  components: {
    Member,
  },
  data() {
    return {
      indexMember: 0,
      submitted: false,
      memberEdit: {},
      members: [
        {
          id: 0,
          account: 'ABC',
          fullName: 'Nguyen ABC',
          email: 'abc@gmail.com',
          dob: '1999-12-01',
          role: 'PM',
        },
        {
          id: 1,
          account: 'XYZ',
          fullName: 'Nguyen XYZ',
          email: 'xyz@gmail.com',
          dob: '1999-12-01',
          role: 'PM',
        },
      ],
    };
  },
  // mounted() {
  //   this.retrieveMembers();
  // },
  methods: {
    // retrieveMembers() {
    //   MemberDataService.getAll()
    //     .then((response) => {
    //       this.members = response.data;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    addMember: function (newMember) {
      let max = 0;
      let newId = 0;
      for (let i = 0; i < this.members.length; i++) {
        if (this.members[i].id > max) {
          max = this.members[i].id;
        }
      }
      newId = max + 1;
      newMember.id = newId;
      this.members.push(newMember);
    },
    editMember: function (newMember) {
      let index = this.members.findIndex((index) => index.id === newMember.id);
      console.log(index);
      if (index > -1) {
        this.members.splice(index, 1, newMember);
        this.submitted = false;
      }
    },
    edit: function (member) {
      this.memberEdit = member;
      this.submitted = true;
    },
    deleteMember: function (index) {
      this.members.splice(index, 1);
    },
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY');
      }
    },
  },
};
</script>

<style>
.col-form-label {
  font-weight: bold;
}
.button-right {
  justify-content: flex-end;
}
.mr {
  margin-right: 0.5rem !important;
}
</style>
