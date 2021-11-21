<template>
  <div class="member">
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="row mb-2 g-3 align-items-center">
          <div class="col-lg-1">
            <label for="Account" class="col-form-label">Account</label>
          </div>
          <div class="col-lg-3">
            <input
              type="text"
              name="account"
              class="form-control"
              v-model="newMember.account"
              :class="{
                'is-invalid': submitted && $v.newMember.account.$error,
                'is-valid': !$v.newMember.account.$invalid,
              }"
            />
            <div
              v-if="submitted && !$v.newMember.account.required"
              class="invalid-feedback"
            >
              Account is required
            </div>
            <div
              class="invalid-feedback"
              v-if="!$v.newMember.account.minLength"
            >
              Account must have at least
              {{ $v.newMember.account.$params.minLength.min }} letters.
            </div>
            <!-- <div class="error" v-if="!$v.name.maxLength">
              Name must have at most
              {{ $v.name.$params.maxLength.max }} letters.
            </div> -->
          </div>
        </div>
        <div class="row mb-2 g-3 align-items-center">
          <div class="col-lg-1">
            <label for="Fullname" class="col-form-label">Full name</label>
          </div>
          <div class="col-lg-3">
            <input
              type="text"
              name="fullName"
              class="form-control"
              v-model="newMember.fullName"
              :class="{
                'is-invalid': submitted && $v.newMember.fullName.$error,
                'is-valid': !$v.newMember.fullName.$invalid,
              }"
            />
            <div
              v-if="submitted && !$v.newMember.fullName.required"
              class="invalid-feedback"
            >
              Full name is required
            </div>
            <div
              class="invalid-feedback"
              v-if="!$v.newMember.fullName.minLength"
            >
              Full name must have at least
              {{ $v.newMember.fullName.$params.minLength.min }} letters.
            </div>
          </div>
        </div>
        <div class="row mb-2 g-3 align-items-center">
          <div class="col-lg-1">
            <label for="Email" class="col-form-label">Email</label>
          </div>
          <div class="col-lg-3">
            <input
              type="email"
              v-model="newMember.email"
              id="email"
              name="email"
              class="form-control"
              :class="{
                'is-invalid': submitted && $v.newMember.email.$error,
                'is-valid': !$v.newMember.email.$invalid,
              }"
            />
            <div
              v-if="submitted && $v.newMember.email.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.newMember.email.required">Email is required</span>
              <span v-if="!$v.newMember.email.email">Email is invalid</span>
            </div>
          </div>
        </div>
        <div class="row mb-2 g-3 align-items-center">
          <div class="col-lg-1">
            <label for="DateOfBirth" class="col-form-label"
              >Date of birth</label
            >
          </div>
          <div class="col-lg-3">
            <input
              type="date"
              name="dateOfBirth"
              v-model="newMember.dob"
              class="form-control"
              :class="{
                'is-invalid': submitted && $v.newMember.dob.$error,
                'is-valid': !$v.newMember.dob.$invalid,
              }"
            />
            <div
              v-if="submitted && $v.newMember.dob.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.newMember.dob.required"
                >Date of birth is required</span
              >
              <!-- <span v-if="!$v.newMember.dob.maxValue"
                >Date of birth is invalid</span
              > -->
            </div>
          </div>
        </div>
        <div class="row mb-2 g-3 align-items-center">
          <div class="col-lg-1">
            <label for="Role" class="col-form-label">Role</label>
          </div>
          <div class="col-lg-3">
            <select
              class="form-select"
              v-model="newMember.role"
              aria-label="Default select example"
              :class="{
                'is-invalid': submitted && $v.newMember.role.$error,
                'is-valid': !$v.newMember.role.$invalid,
              }"
            >
              <option value="BUL">BUL</option>
              <option value="PM">PM</option>
              <option value="Junior">Junior</option>
            </select>
            <div
              v-if="submitted && !$v.newMember.role.required"
              class="invalid-feedback"
            >
              Role is required
            </div>
          </div>
        </div>
        <div class="row mb-2 col-lg-4 button-right">
          <div class="col-lg-3">
            <div class="row">
              <button
                v-if="changeButton == false"
                type="submit"
                class="btn btn-primary"
              >
                Add
              </button>
              <button
                v-if="changeButton == true"
                type="submit"
                class="btn btn-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
export default {
  props: {
    memberUpdate: {
      type: Object,
      default: null,
    },
    changeButton: {
      type: Boolean,
      default: null,
    },
  },
  watch: {
    memberUpdate: function () {
      if (this.memberUpdate) {
        this.newMember = Object.assign({}, this.memberUpdate);
      } else {
        this.newMember = {};
      }
    },
  },
  data() {
    return {
      submitted: false,
      newMember: {
        id: 0,
        account: '',
        fullName: '',
        email: '',
        dob: '',
        role: '',
      },
    };
  },
  validations: {
    newMember: {
      account: { required, minLength: minLength(3) },
      fullName: { required, minLength: minLength(3) },
      email: { required, email },
      dob: { required },
      role: { required },
    },
  },
  methods: {
    handleSubmit: function () {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        if (this.changeButton === false) {
          this.clickAddMember();
        } else {
          this.clickEditMember();
        }
      }
    },
    clickAddMember: function () {
      this.$emit('add', this.newMember);
      alert('Add Successful.');
      this.resetForm();
    },
    clickEditMember: function () {
      this.$emit('editM', this.newMember);
      alert('Edit Successful.');
      this.resetForm();
    },
    resetForm: function () {
      this.newMember = {
        id: 0,
        account: '',
        fullName: '',
        email: '',
        dob: '',
        role: '',
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>

<style>
</style>