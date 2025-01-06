import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const router = useRouter();
  const isAuthenticated = ref(false);

  const getAuthToken = () => {
    localStorage.setItem("token", "123123");
    return localStorage.getItem("token");
  };

  const checkAuth = () => {
    const token = getAuthToken();
    isAuthenticated.value = !!token;
    return isAuthenticated.value;
  };

  const requireAuth = async (to: any) => {
    if (!checkAuth()) {
      router.push({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  };

  const redirectIfAuthenticated = () => {
    if (checkAuth()) {
      router.push("/crm/dashboard");
    }
  };

  return {
    isAuthenticated,
    checkAuth,
    requireAuth,
    redirectIfAuthenticated,
  };
};
