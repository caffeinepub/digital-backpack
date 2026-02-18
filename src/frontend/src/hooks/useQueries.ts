import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BackpackItem } from '../backend';

export function useListItems() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<BackpackItem[]>({
    queryKey: ['backpackItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listItems();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; quantity: bigint; description: string; weight: number }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createItem(data.name, data.quantity, data.description, data.weight);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backpackItems'] });
    },
  });
}

export function useUpdateItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: bigint; name: string; quantity: bigint; description: string; weight: number }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateItem(data.id, data.name, data.quantity, data.description, data.weight);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backpackItems'] });
    },
  });
}

export function useDeleteItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backpackItems'] });
    },
  });
}

export function useInitializeBackpack() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.initializeBackpack();
    },
  });
}

export function useHasBackpack() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['hasBackpack'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasBackpack();
    },
    enabled: !!actor && !actorFetching,
  });
}
