import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../../app/store/authStore';
import { createProjectApi, deleteProjectApi, getProjectsApi } from '../api/project.api';

export default function useProjects() {
  const queryClient = useQueryClient();
  const uid = useAuthStore((state) => state.user?.uid);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState(null);
  const queryKey = ['projects', 'list', uid];

  const { data: projects = [], isLoading: queryLoading, error: queryError, refetch } = useQuery({
    queryKey,
    queryFn: getProjectsApi,
    enabled: Boolean(uid),
    staleTime: 300000,
    meta: { persist: false },
  });

  const createProject = useCallback(async (projectData) => {
    setMutationLoading(true);
    setMutationError(null);
    try {
      const project = await createProjectApi(projectData);
      await queryClient.invalidateQueries({ queryKey: ['projects', 'list', uid] });
      return project;
    } catch (error) {
      setMutationError(error.message);
      throw error;
    } finally {
      setMutationLoading(false);
    }
  }, [queryClient, uid]);

  const deleteProject = useCallback(async (id) => {
    setMutationLoading(true);
    setMutationError(null);
    try {
      await deleteProjectApi(id);
      const projectQueryKey = ['projects', 'list', uid];
      queryClient.setQueryData(projectQueryKey, (previous = []) => previous.filter((project) => project.id !== String(id)));
      await queryClient.invalidateQueries({ queryKey: projectQueryKey });
    } catch (error) {
      setMutationError(error.message);
      throw error;
    } finally {
      setMutationLoading(false);
    }
  }, [queryClient, uid]);

  const restoreProject = useCallback(async () => {
    throw new Error('Project restore is not supported.');
  }, []);

  return {
    projects,
    isLoading: queryLoading || mutationLoading,
    error: queryError?.message || mutationError,
    createProject,
    deleteProject,
    restoreProject,
    refetch,
  };
}
