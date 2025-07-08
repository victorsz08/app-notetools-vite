import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";

interface UpdateUserInput {
  username: string;
  firstName: string;
  lastName: string;
}

interface UpdateAvatarUserInput {
  avatarUrl: string;
}

interface UpdatePasswordUserInput {
  currentPassword: string;
  newPassword: string;
}

interface UseUserProps {
  updateUser: (input: UpdateUserInput) => Promise<void>;
  updateAvatarUser: (input: UpdateAvatarUserInput) => Promise<void>;
  updatePasswordUser: (input: UpdatePasswordUserInput) => Promise<void>;
}

export function useUser(): UseUserProps {
  const { user } = useAuth();

  const updateUser = async (input: UpdateUserInput) => {
    await api.put(`users/${user?.id}`, input);

    return;
  };

  const updateAvatarUser = async (input: UpdateAvatarUserInput) => {
    await api.put(`users/update-avatar/${user?.id}`, input);

    return;
  };

  const updatePasswordUser = async (input: UpdatePasswordUserInput) => {
    await api.put(`users/update-password/${user?.id}`, input);
    return;
  };

  return {
    updateAvatarUser,
    updatePasswordUser,
    updateUser,
  };
}
