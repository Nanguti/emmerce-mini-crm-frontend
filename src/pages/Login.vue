<!-- src/pages/login.vue -->
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const route = useRoute();
const { redirectIfAuthenticated } = useAuth();

const email = ref("");
const password = ref("");
const error = ref("");

// Redirect if already authenticated
onMounted(() => {
  redirectIfAuthenticated();
});

const handleLogin = async () => {
  try {
    // Your login API call here
    const response = await loginUser(email.value, password.value);

    // Store the token
    localStorage.setItem("auth_token", response.token);

    // Redirect to the originally requested page or dashboard
    const redirectPath = (route.query.redirect as string) || "/crm/dashboard";
    router.push(redirectPath);
  } catch (err) {
    error.value = "Invalid credentials";
  }
};

async function loginUser(email: string, password: string) {
  // Implement your actual login API call here
  return { token: "dummy_token" }; // Replace with actual API response
}
</script>

<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin">
      <div v-if="error" class="error">{{ error }}</div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>
